function Button(props) {
  return <button onClick={props.onClick}>{props.children}</button>;
}

function ButtonWrapper(props) {
  return (
    <div>
      {props.renderButton({
        onClick: () => console.log("Button clicked")
      })}
    </div>
  );
}

function App() {
  return (
    <ButtonWrapper
      renderButton={(arg) => (
        <Button onClick={arg.onClick}>Click me</Button>
      )}
    />
  );
}
