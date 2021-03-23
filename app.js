
const GameBoard = (() => {
  const boardArray = new Array(9).fill('');
  const container = document.querySelector('.container');
  let areNamesEmpty = false;
  const Player = (name, mark, coord) => {
    return { name, mark, coord }
  }

  const player1 = Player('player1', 'X', []);
  const player2 = Player('player2', 'O', []);
  let turn = player1;

  const reset = (() => {
    for(let i = 0; i < boardArray.length; i++) {
      boardArray[i] = '';
    };
    turn = player1;
    areNamesEmpty = false;
    player1.coord = [];
    player2.coord = [];

  })

  const startGame = (() => {
    const playButton = document.querySelector('.playButton');
    const playerNames = document.querySelectorAll('.playerName');
    
    playButton.onclick = () => {
      reset();
      playerNames.forEach((playerName => {
        if(playerName.value === '') {
        areNamesEmpty = true;
      }
    }));
      if(areNamesEmpty === false) {
        player1.value = playerNames[0].value;
        player2.value = playerNames[1].value;
        makeBoard();
      }
    }
  })();

  const checkWhosTurn = (() => {
    const turnDivs = document.querySelectorAll('.turnDisplay');
    turnDivs.forEach(area => {
      area.textContent = ''
    });
    turn == player1
    ? turnDivs[0].textContent = 'Your turn'
    : turnDivs[1].textContent = 'Your turn'
  })

  const makeBoard = (() => {
    container.textContent = '';
    boardArray.forEach((item, index) => {
      const newDiv = document.createElement('div');
      newDiv.className = 'room';
      newDiv.textContent = item;
      newDiv.dataset.index = index;
      checkWhosTurn();  

      newDiv.onclick = (e) => {
        if(e.target.textContent === '') {
          displayController(e.target, turn);
        }
      }
      container.appendChild(newDiv);
    });
  });

  const displayController = ((location, player) => {
    boardArray[location.dataset.index] = player.mark;
    location.textContent = player.mark;
    checkPlayerMarks(location, turn);
    player == player1 ? turn = player2 : turn = player1;
    checkWhosTurn();
  });

  const winningCoordinate = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const checkPlayerMarks = ((location, player) => {
    player.coord.push(+location.dataset.index);
    player.coord.sort((a, b) => a - b);
    console.log(player1.coord, player2.coord);
    if(player.coord.length >= 3) {
      checkWinner(player.coord, player);
    }
  })

  const checkWinner = (coord, player) => {
    let winner = '';
    winningCoordinate.forEach(winningArr => {
      if(winningArr.every(ele => coord.includes(ele))) {
        winner = player.value;
        showWinner(winner);
        return;
      }
    })
    if(!winner && (player1.coord.length === 5
      ||player2.coord.length === 5)){
        showDraw();
      }
  }

  const showWinner = ((winner) => {
    const newDiv = document.createElement('div');
    newDiv.className = 'winnerMessage';
    newDiv.textContent = `${winner} is won!
    Who's gonna win next round?`
    container.appendChild(newDiv);
  })

  const showDraw = (() => {
    const newDiv = document.createElement('div');
    newDiv.className = 'drawMessage';
    newDiv.textContent = `It's a draw!
    Who's gonna win next round?`
    container.appendChild(newDiv);
  })

  // 위너 체크
  // 현재 순서의 좌표를 배열에 저장
  
  // winningCoordinate 돌려서
  // 저장한 배열에 전부 존재하는지 확인

  // 존재하면 경기 종료
})();

// container에 div 9개 만들어주고
// 배열값을 div 9개에 넣어주자, 연결하자라는 의미

// div에 클릭 이벤트를 주자
// 클릭되면 gameBoard 배열값에 순서대로 X, O 넣자

// 넣어줄때 마다 이겼는지 확인
// 이겼으면 게임을 끝낸다
