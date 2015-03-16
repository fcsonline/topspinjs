/** @jsx React.DOM */

var React = require('react');

var socket = io.connect()
var GamesActions = require('../../actions/GamesActions.js');
var PlayersStore = require('../../stores/players/store.js');

var NewPlayerPickerItem = React.createClass({
  render: function () {
    return (
      <li onClick={this.props.onInviteUser} className={"playerpicker__item"}></li>
    );
  }
});

var PlayerPickerItem = React.createClass({
  render: function () {
    var styles = {
      backgroundImage: 'url(' + this.props.player.avatar + ')'
    };

    return (
      <li onClick={this.props.onClick} className={"playerpicker__item " + (this.props.selected ? 'playerpicker__selected' : '')} style={styles}></li>
    );
  }
});

/**
 * Games controller view.
 */
var PlayerPicker = React.createClass({
  getInitialState: function () {
    return {
      players: PlayersStore.toJSON()
    , inviting: false
    , selected: []
    };
  },
  onPlayerSelect: function (player, event) {
    var selected = this.state.selected;

    if (_.contains(selected, player)) {
      selected = _.without(selected, player);
    } else {
      selected.push(player);
    }

    this.setState({selected: selected});
  },
  onAddTeam: function () {
    this.props.addTeam(this.state.selected);
  },
  onInviteUser: function () {
    this.setState({
      inviting: !this.state.inviting
    });
  },
  onCreatePlayer: function () {
    PlayersStore.fetch();
  },
  render: function () {
    var self = this;

    return (
      <div className="playerpicker">
        <ul className="playerpicker--list">
        {this.state.players.map(function (player) {
          return <PlayerPickerItem player={player} selected={_.contains(self.state.selected, player)} onClick={_.partial(self.onPlayerSelect, player)}/>;
        })}
        <NewPlayerPickerItem onInviteUser={this.onInviteUser}/>
        </ul>
        <div className={'newplayer ' + (this.state.inviting ? 'show' : 'hide')}>
          <img src="/auth/qrcode.png"/>
        </div>
        <div className='playerpicker--toolbar'>
          <button onClick={this.onAddTeam}>Add Team!</button>
        </div>
      </div>
    );
  },
  _onChange: function () {
    this.setState({
      players: PlayersStore.toJSON()
    });
  },
  componentDidMount: function () {
    socket.on('players.new', this.onCreatePlayer);
    PlayersStore.on('change sync', this._onChange, this);
  }
});

module.exports = PlayerPicker;
