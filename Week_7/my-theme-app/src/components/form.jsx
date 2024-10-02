import Panel from './panel';
import Button from './button';

export default function Form() {
  return (
    <Panel title="Welcome to the Form">
      <Button>Sign up</Button>
      <Button>Log in</Button>
    </Panel>
  );
}