export const LabelAuto = ({ isAuto }) => {
  if (isAuto) {
    return (
      <div className="text-with-bg is-auto small">
        <span className="text-on-bg text-secondary">自動入力</span>
      </div>
    );
  }
};
