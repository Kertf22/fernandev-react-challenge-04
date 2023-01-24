import './App.css';
import Square from './Square';
import useGame from './useGame';

/*
  DESAFIO TÉCNICO - JOGO DA VELHA - por fernandev

  * descrição
    desenvolva um jogo da velha (tic tac toe) funcional.
    use qualquer técnica de estilização preferida: css modules, sass, styled.

  * tasks
    ? - crie um board de 3x3
    ? - dois jogadores
    ? - ao clicar em um quadrado, preencher com a jogada
    ? - avisar quando o jogo finalizar, caso dê velha avise também
    ? - fazer um risco na sequência vencedora, caso houver
*/


function App() {

  const { game, line, handleClick } = useGame();

  return (
    <div className='board-game'>
      <div className='line-wrapper'
      >
        <div className='line' style={{
          display: line.display,
          top: `${line.top ? line.top : null}px`,
          right: `${line.right ? line.right : null}px`,
          transform: `rotate(${line.rotate}deg)`,
        }} ></div>
      </div>

      {game.map((horizontal, hp) => (
        horizontal.map((value, position) => (
          <Square
            value={value}
            id={`${hp} ${position}`}
            handleClick={() => handleClick(hp, position)}
            index={position + hp * 3}

          />
        ))
      ))}
    </div>
  );
};



export default App;
