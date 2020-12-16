const TypeDoc = require('typedoc');
const typescript = require('typescript');
const fs = require('fs');
const { type } = require('os');

// specifically point to tsconfig, otherwise TypeDoc fails
const tsconfig = typescript.findConfigFile(
  '../tsconfig.js',
  typescript.sys.fileExists
);
const outPath = '../react-magma-docs/src/data/properties.json';
const inPath = ['./src/components'];

const defaultDescriptions = {
  children: 'The content of the component',
  isInverse:
    'If true, the component will have inverse styling to better appear on a dark background',
  testId:
    'Test ID attached to an internal element as `data-testid` for consumer testing',
};

const defaultDefaults = {
  isInverse: 'false',
};

const generateJson = () => {
  const app = new TypeDoc.Application();

  // If you want TypeDoc to load tsconfig.json / typedoc.json files
  app.options.addReader(new TypeDoc.TSConfigReader());
  app.options.addReader(new TypeDoc.TypeDocReader());

  app.bootstrap({
    tsconfig,
    mode: 'modules',
    includeDeclarations: true,
    excludeExternals: true,
    stripInternal: true,
    ignoreCompilerErrors: true,
  });

  const project = app.convert(app.expandInputFiles(inPath));

  if (project) {
    // Project may not have converted correctly
    // Alternatively generate JSON output
    app.generateJson(project, outPath);
  }
};

const filterJson = () => {
  const jsonOrig = JSON.parse(fs.readFileSync(outPath, 'utf8'));
  // console.log(JSON.stringify(jsonOrig, null, 2))

  const findById = id => {
    return jsonOrig.children
      .flatMap(child => child.children)
      .filter(child => child.id === id)
      .pop();
  };
  const findByName = name => {
    return jsonOrig.children
      .flatMap(child => child.children)
      .filter(child => child.name === name)
      .pop();
  };

  const sortObject = unordered => {
    const ordered = {};
    Object.keys(unordered)
      .sort()
      .forEach(function (key) {
        ordered[key] = unordered[key];
      });
    return ordered;
  };

  const cleanChildren = (children, acc = {}) => {
    if (!children) return acc;

    return sortObject(
      children
        .filter(filterReactDefinitions)
        .filter(filterEmotion)
        .reduce(formatChild, acc)
    );
  };

  const findType = ({ type, id, name, elementType = {} }) => {
    name = name || elementType.name;
    let suffix = '';
    if (type === 'array') {
      suffix = '[]';
    }
    if (type === 'reference') {
      const referenceType = findById(id);
      if (referenceType && referenceType.kindString === 'Enumeration') {
        return {
          name: 'enum',
          options: referenceType.children.map(
            child => `${referenceType.name}.${child.name}`
          ),
        };
      }
    }

    name = name === 'T' ? 'Generic' : name;

    return { name: `${name || 'function'}${suffix}` };
  };

  const filterEmotion = definition =>
    definition.type !== 'InterpolationWithTheme' && definition.name !== 'css';

  const filterReactDefinitions = definition =>
    definition.sources[0].fileName !== 'node_modules/@types/react/index.d.ts';

  const formatTags = (tags = []) => {
    return tags.reduce((acc, { tag, text }) => {
      return { [tag]: text.trim(), ...acc };
    }, {});
  };

  const formatChild = (acc, child) => {
    const tags = formatTags((child.comment && child.comment.tags) || []);
    return {
      ...acc,
      [child.name]: {
        name: child.name,
        required: child.flags && !child.flags.isOptional,
        type: findType(child.type),
        description:
          (child.comment && child.comment.shortText) ||
          defaultDescriptions[child.name],
        defaultValue: defaultDefaults[child.name] || tags.default,
        deprecated: !!tags.deprecated,
      },
    };
  };

  const jsonFinal = jsonOrig.children
    .flatMap(child => child.children)
    .filter(
      child =>
        child.kindString === 'Interface' || child.kindString === 'Type alias'
    )
    .reduce((acc, child) => {
      const {
        children,
        groups,
        sources,
        extendedTypes,
        extendedBy,
        id,
        ...rest
      } = child;

      let childAccumulator = {};
      const tags = formatTags((child.comment && child.comment.tags) || []);

      if (tags.children) {
        childAccumulator = formatChild(childAccumulator, {
          ...child.children
            .filter(child => child.name === 'children')
            .flatMap(child => {
              return {
                ...child,
                flags: {
                  ...child.flags,
                  isOptional: tags.children !== 'required',
                },
              };
            })[0],
        });
      }

      if (rest.type && rest.type.type === 'intersection') {
        return [
          ...acc,
          {
            ...rest,
            id: rest.name,
            properties: cleanChildren(
              rest.type.types.reduce((childAcc, childType) => {
                return childAcc.concat(findById(childType.id).children);
              }, []),
              childAccumulator
            ),
          },
        ];
      }

      return [
        ...acc,
        {
          ...rest,
          id: rest.name,
          tags,
          properties: cleanChildren(children, childAccumulator),
        },
      ];
    }, []);

  fs.writeFileSync(outPath, JSON.stringify(jsonFinal, null, 2));
};

generateJson();
filterJson();
