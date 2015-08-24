var React = require('react');
var socket = io.connect();
var ScoreBoardSide = require('./ScoreBoardSide.js');

var ScoreBoard = React.createClass({
  getInitialState: function () {
    $.getJSON('/api/games/current')
      .done(this.fetchState)
      .fail(this.buildGame);

    return {
      score_left: 0
    , score_right: 0
    , left: {}
    , right: {}
    , players: PlayersStore
    , groups: GroupsStore
    };
  },
  buildGame: function () {
    this.setState({
      status: 'warmup'
    });
  },
  fetchState: function (data) {
    var type_collection;

    if (!this.state.players) {
      return;
    }

    if (data.type === 'singles') {
      type_collection = this.state.players;
    } else {
      type_collection = this.state.groups;
    }

    data.left = type_collection.get(data.left).toJSON();
    data.right = type_collection.get(data.right).toJSON();

    this.setState(data);
  },
  setSideLeft: function (side) {
    this.setState({
      left: side
    });
  },
  setSideRight: function (side) {
    this.setState({
      right: side
    });
  },
  onStart: function () {
    GamesActions.schedule(this.state.left.id, this.state.right.id);
  },
  onDisconnect: function () {
    // # Blur grey...
    this.setState({
      connection: false
    });
  },
  render: function () {
    return (
      <div className={"scoreboard full-expanded scoreboard--gamestatus-" + this.state.status}>
        <ScoreBoardSide game={this.state} side='left' setSide={this.setSideLeft}/>
        <div className="scoreboard__separator" onClick={this.onStart}>
          <div><span className="scoreboard__vs">vs</span></div>
          <div><span className="scoreboard__start">Start</span></div>
        </div>
        <ScoreBoardSide game={this.state} side='right' setSide={this.setSideRight}/>
      </div>
    );
  },
  componentDidMount: function () {
    socket.on('point', this.fetchState);
    socket.on('disconnect', this.onDisconnect);

    PlayersStore.on('change sync', this._onChange, this);
  }
});

module.exports = ScoreBoard;
