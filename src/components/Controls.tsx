import './css/Controls.css';

interface ControlsProps {
  canBet: boolean;
  canRaiseOrCall: boolean;
  onAction: (action: string) => void;
}

export default function Controls({
  canBet,
  canRaiseOrCall,
  onAction,
}: ControlsProps) {
  return (
    <div className="controls">
      <button
        className="control-button"
        onClick={() => onAction('Fold')}
      >
        Fold
      </button>

      {canBet && (
        <>
          <button
            className="control-button"
            onClick={() => onAction('Check')}
          >
            Check
          </button>

          <button
            className="control-button"
            onClick={() => onAction('Bet')}
          >
            Bet
          </button>
        </>
      )}

      {canRaiseOrCall && (
        <>
          <button
            className="control-button"
            onClick={() => onAction('Call')}
          >
            Call
          </button>

          <button
            className="control-button"
            onClick={() => onAction('Raise')}
          >
            Raise
          </button>
        </>
      )}
    </div>
  );
}