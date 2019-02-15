import React, { Component } from 'react';
import {
  Input,
  Button,
  Checkbox,
  Icon,
  IconButton,
  LinkButton,
  RadioGroup,
  Radio,
  Select
} from 'react-magma-dom';

class App extends Component {
  render() {
    return (
      <div>
        <h1>INPUTS</h1>
        <Input id="labeledInput" labelText="Label" />
        <Input id="focusedInput" autoFocus={true} />
        <Input id="defaultInput" />
        <Input id="numberInput" type="number" />
        <Input id="passwordInput" type="password" />
        <Input id="requiredInput" required={true} />
        <Input id="disabledInput" disabled={true} />

        <h1>BUTTONS</h1>
        <Button
          id="defaultButton"
          onClick={() => {
            alert('clicked');
          }}
        >
          Default Button
        </Button>

        <Button id="disabledButton" disabled>
          Disabled Button
        </Button>

        <LinkButton
          onClick={() => {
            alert('clicked');
          }}
        >
          Link Button
        </LinkButton>

        <h1>ICON BUTTONS</h1>
        <IconButton
          label="Default Icon Button With Text"
          textPosition="right"
          icon="bell"
          onClick={() => {
            alert('clicked');
          }}
        />
        <IconButton
          disabled
          label="Disabled Icon Button With Text"
          textPosition="right"
          icon="bell"
        />

        <IconButton
          id="defaultIconButton"
          label="Default Icon Button"
          icon="bell"
          onClick={() => {
            alert('clicked');
          }}
        />
        <IconButton
          id="disabledIconButton"
          disabled
          label="Disabled Icon Button"
          icon="bell"
        />

        <h1>ICONS</h1>
        <Icon id="basicInfoIcon" title="Basic Info Icon" type="info" />

        <h1>RADIOS</h1>
        <RadioGroup
          name="colors"
          labelText="Colors"
          onChange={event => {
            alert(`${event.target.value} selected`);
          }}
        >
          <Radio value="red" labelText="Red" />
          <Radio value="blue" labelText="Blue" />
        </RadioGroup>

        <h1>CHECKBOXES</h1>
        <Checkbox id="requiredCheckbox" labelText="Label" required={true} />
        <Checkbox id="disabledCheckbox" labelText="Label" disabled={true} />
        <Checkbox
          id="defaultCheckbox"
          labelText="Label"
          onChange={() => {
            alert('clicked');
          }}
        />

        <h1>SELECTS</h1>
        <Select
          id="basicSelectId"
          name="basic"
          labelText="Basic"
          options={[
            {
              value: 'red',
              label: 'Red'
            },
            {
              value: 'blue',
              label: 'Blue'
            },
            {
              value: 'green',
              label: 'Green'
            }
          ]}
          handleOpen={() => {
            alert('opened');
          }}
          handleClose={() => {
            alert('closed');
          }}
        />
        <Select
          id="changeSelectId"
          name="change"
          labelText="Change"
          options={[
            {
              value: 'red',
              label: 'Red'
            },
            {
              value: 'blue',
              label: 'Blue'
            },
            {
              value: 'green',
              label: 'Green'
            }
          ]}
          onChange={() => {
            alert('changed');
          }}
        />
      </div>
    );
  }
}

export default App;
