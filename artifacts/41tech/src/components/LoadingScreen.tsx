import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onDone: () => void;
}

export function LoadingScreen({ onDone }: LoadingScreenProps) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => setExiting(true), 2200);
    const doneTimer = setTimeout(onDone, 2700);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div className={`loading-overlay${exiting ? ' loading-overlay--exit' : ''}`}>
      <div className="terminal-loader">
        <div className="terminal-header">
          <p className="terminal-title">kf@portfolio:~</p>
          <div className="terminal-controls">
            <span className="control close" />
            <span className="control minimize" />
            <span className="control maximize" />
          </div>
        </div>
        <p className="terminal-text">Kauan Funaki</p>
      </div>
    </div>
  );
}
