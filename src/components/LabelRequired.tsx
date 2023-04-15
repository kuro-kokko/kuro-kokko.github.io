export const LabelRequired = ({ required }) => {
  if (required) {
    return (
      <div className="text-with-bg is-required small">
        <span className="text-on-bg text-danger">必須</span>
      </div>
    );
  }
};
