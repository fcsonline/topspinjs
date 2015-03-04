/** @jsx React.DOM */

var React = require('react');

var GamesStore = require('../../stores/games/store.js');
var PlayersStore = require('../../stores/players/store.js');
var PlayerPicker = require('../../views/playerpicker/PlayerPicker.js');

var ScoreBoardSide = React.createClass({
  getInitialState: function () {
    return {
      openMenu: false
    };
  },
  openMenu: function () {
    this.setState({openMenu: true});
  },
  addTeam: function (selected) {
    this.setState({
      player: selected[0] // TODO
    , openMenu: false
    });
  },
  render: function () {
    var styles = {}
      , defined
      , player;

    player = this.props.game[this.props.side] || this.state.player;
    defined = !_.isEmpty(player);

    if (defined) {
      styles.backgroundImage = 'url(' + player.avatar + ')';
    }

    return (
      <div className="scoreboard__item">
        <div className="scoreboard__player">
          <div className="scoreboard__score"></div>
          <div className={"scoreboard__select " + (defined ? 'hide' : '')} onClick={this.openMenu}>+</div>
          <div className={"scoreboard__avatar " + (defined ? '' : 'hide')} onClick={this.openMenu} style={styles}></div>
          <div className="scoreboard__name">
            {player.name || "Add Players"}
          </div>
        </div>
        <div className={'playerpicker offscreen-menu slide-from-bottom ' + (this.state.openMenu ? 'show' : 'hide')}>
          <PlayerPicker addTeam={this.addTeam}/>
        </div>
      </div>
    );
  },
  _onChange: function () {
    this.setState(this._getAppState());
  },
  componentDidMount: function () {
    PlayersStore.on('change sync', this._onChange, this);
  }
});

module.exports = ScoreBoardSide;
