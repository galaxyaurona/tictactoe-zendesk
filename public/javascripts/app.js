angular.module('TicTacToe', ['ngRoute'])
    .controller("MainController", function($scope) {

        $scope.boardSize = 3;
        $scope.board = [];
        $scope.checked = false;
        // to check the game ended without winner
        $scope.numPlays = 0;
        // start the game
        $scope.gameStart = function() {
                // initialize variable and board
                $scope.gameStarted = true;
                for (var i = 0; i < $scope.boardSize; i++) {
                    $scope.board[i] = new Array($scope.boardSize);
                }

            }
            // this dummy function return and array to the front end
        $scope.getBoardSize = function() {
            return new Array($scope.boardSize);
        }
        // check 5 item vertically from this row
        $scope.checkVertical = function(row, col) {

            var limitation = limit(col);
            var result = true;
               var inARow = 0;
            for (var i = limitation.lowerLimit; i <= limitation.upperLimit; i++) {
                if ($scope.board[i][col] != $scope.board[row][col]) {
                    result = false;
                }else{ // count how many in the row
                    inARow++;
                }
                // win condition, can break
                if (inARow==3) break;
            }
            return result;
        }
        // check 5 item horizontally from this row
        $scope.checkHorizontal = function(row, col) {
            var limitation = limit(col);
            var result = true;
            var inARow = 0;
            for (var i = limitation.lowerLimit; i <= limitation.upperLimit; i++) {
                if ($scope.board[row][i] != $scope.board[row][col]) {
                    result = false;
                }else{ // count how many in the row
                    inARow++;
                }
                // win condition, can break
                if (inARow==3) break;
            }
            return result;
        }
        // DRY the limit fnction for both checking
        var limit = function(num) {
            var limitation = {
                lowerLimit: 0,
                upperLimit: $scope.boardSize
            };
            limitation.lowerLimit = num - 2,
                limitation.upperLimit = num + 2;
            limitation.lowerLimit = limitation.lowerLimit < 0 ? 0 : limitation.lowerLimit;
            limitation.upperLimit = limitation.upperLimit > $scope.boardSize - 1 ? $scope.boardSize - 1 : limitation.upperLimit;
            return limitation;

        }
        // logic behind playing
        $scope.play = function(row, col) {

            // make sure game hasn't finished and the current location is already tickec
            if (!$scope.gameFinished  && $scope.board[row][col] == undefined )  {
                // assign a value to a board
                $scope.board[row][col] = $scope.checked;
                // check if anyone wins
                $scope.gameFinished = $scope.checkHorizontal(row, col) || $scope.checkVertical(row, col);
                // after this, game should not finished, if it not finished then increase the number of play and set unchecked
                if (!$scope.gameFinished){
                    $scope.numPlays++;
                    $scope.checked = !$scope.checked;
                }
                // finished without winner,number of plays == number of cells 
                if ($scope.numPlays == $scope.boardSize*$scope.boardSize){
                    $scope.gameFinished = true;
                }
            }

        }



    });