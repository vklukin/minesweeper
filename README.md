# Minesweeper 

Minesweeper is a game. This app was created with ReactJs and SCSS.

## How to start the application:

To start application you should do that:

1. Open the project in **Code Editor**. It can be VS Code, WebStorm or anything else
2. Open the terminal
3. Enter `npm start` to start the application

After any seconds, the app will be open. 

## App functions

### The app includes:

- Field with random generated mines. Default amount of mines - 40.
- Each cell can be open after user's click on that cell.
- The timer, which will turn on after first user's click on any cell.
- Counter of flags 🚩. 
- User can mark the cell with a flag on right click of mouse. Another click on the celk with a flag will place question mark on clicked cell.
- If user click on smile (between flags counter and timer), then game, timer and flags counter will be refreshed

### What i can't do

- I was unable to open adjacent empty cells


# Comments

In the process of creating the application I realized:

1. It would be easier to store an object per every cell in an game's array. This object may contain either cell's value and cell's state.

```javascript
plate = {
  value: 0, 
  state: {
    isBomb: false,
    isFlagged: false,
    isQuestion: true
  }
}
```

2. To open adjacent cells, you can write a recursion that will check the adjacent cell by coordinates and check if it is empty. If it is empty, then open and run the recursion further to check the next cell
