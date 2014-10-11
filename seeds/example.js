'use strict';

var crypto = require('crypto');

exports.seed = function (knex, Promise) {
  var now = new Date();

  function password(phrase) {
    return crypto.createHash('sha1').update(phrase).digest('hex');
  }

  return Promise.join(

    // PLAYERS
    knex.insert([
      {
        id: 1
      , name: 'Ma Long'
      , login: 'malong'
      , password: password('malong')
      , gender: 'male'
      , play_count: 21874
      , created_at: now
      , updated_at: now
      }
    , {
        id: 2
      , name: 'Timo Boll'
      , login: 'timo'
      , password: password('timo')
      , gender: 'male'
      , play_count: 19383
      , created_at: now
      , updated_at: now
      }
    , {
        id: 3
      , name: 'Zhang Jike'
      , login: 'zhang'
      , password: password('zhang')
      , gender: 'male'
      , play_count: 13383
      , created_at: now
      , updated_at: now
      }
    , {
        id: 4
      , name: 'Zhenlong'
      , login: 'zhenlong'
      , password: password('zhenlong')
      , gender: 'male'
      , play_count: 17365
      , created_at: now
      , updated_at: now
      }
    ]).into('players'),

    // GAMES
    knex.insert([
      {
        id: 1
      , type: 'singles'
      , status: 'played'
      , start: '2014-3-13 10:20:01'
      , end: '2014-3-13 10:24:11'
      , score_left: 9
      , score_right: 11
      }
    , {
        id: 2
      , type: 'groups'
      , status: 'played'
      , start: '2014-10-10 12:20:00'
      , end: '2014-10-10 12:25:10'
      , score_left: 21
      , score_right: 13
      }
    , {
        id: 3
      , type: 'singles'
      , status: 'playing'
      , start: '2014-10-10 12:27:00'
      , score_left: 4
      , score_right: 7
      }
    , {
        id: 4
      , type: 'singles'
      , status: 'scheduled'
      }
    ]).into('games'),

    // GAME PLAYERS
    knex.insert([
      {
        game_id: 1
      , player_id: 1
      , left: true
      , winner: false
      }
    , {
        game_id: 1
      , player_id: 2
      , left: false
      , winner: true
      }
    , {
        game_id: 3
      , player_id: 3
      , left: true
      }
    , {
        game_id: 3
      , player_id: 4
      , left: false
      }
    , {
        game_id: 4
      , player_id: 2
      , left: true
      }
    , {
        game_id: 4
      , player_id: 4
      , left: false
      }
    ]).into('games_players'),

    // GROUPS
    knex.insert([
      {
        id: 1
      , name: 'Group 1'
      , created_at: now
      , updated_at: now
      }
    , {
        id: 2
      , name: 'Group 2'
      , created_at: now
      , updated_at: now
      }
    ]).into('groups'),

    // GROUP PLAYERS
    knex.insert([
      {
        group_id: 1
      , player_id: 1
      }
    , {
        group_id: 1
      , player_id: 2
      }
    , {
        group_id: 2
      , player_id: 3
      }
    , {
        group_id: 2
      , player_id: 4
      }
    ]).into('groups_players'),

    // GAME PLAYERS
    knex.insert([
      {
        game_id: 2
      , group_id: 1
      , left: true
      , winner: true
      }
    , {
        game_id: 2
      , group_id: 2
      , left: false
      , winner: false
      }
    ]).into('games_groups')
  );
};