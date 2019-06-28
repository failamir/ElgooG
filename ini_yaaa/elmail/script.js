// App Init
var inboxApp = angular.module('inboxApp', ['ngSanitize']);


// Body Controller
inboxApp.controller('bodyController', function($rootScope) {
  $rootScope.displayUserList = false;

  this.clearModules = function() {
    $rootScope.displayUserList = false;
  };
});


// User Data Controller
inboxApp.controller('userDataController', function($rootScope) {
  this.users = userData.users;

  // User Select
  this.activeUser = this.users[0];

  this.showHideUsers = function(e) {
    $rootScope.displayUserList = !$rootScope.displayUserList;
    if (e) e.stopPropagation();
  };

  this.selectUser = function ($index) {
    this.activeUser = this.users[$index];
    this.activeEmail = this.activeUser.emails[0];
    this.acctiveMessage = 0;
    this.showHideUsers();
  };

  // Message Select
  this.activeEmail = this.activeUser.emails[0];
  this.acctiveMessage = 0;

  this.showMessage = function(targetEmail, $index) {
    this.activeEmail = targetEmail;
    this.acctiveMessage = $index;
  };

  // Search
  this.searchFilter = function() {
    this.acctiveMessage = -1;
  };
});


// Buttons
var buttons = document.getElementsByClassName('button');

var noTime = function() {
  alert('No time for email. Winter is coming!');
};

for (var i = 0, buttonsLength = buttons.length; i < buttonsLength; i++) {
  buttons[i].addEventListener('click', noTime, false);
};


// DATA
var userData = {
  users: [
    {
      userName: 'Fail Amir',
      avatar: 'tumb.jpg',
      emailAddress: 'failamir@gmail.com',
      emails: [
        {
          date: 'Nov 14, 0299 at 1:28 AM',
          fromAddress: 'burhanarif99@gmail.com',
          fromName: 'burhanarif99',
          avatar: 'https://33.media.tumblr.com/avatar_e7371cca0d7d_128.png',
          subject: 'Assalamualaikum..',
          salutation: 'hai...,',
          message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
          signature: 'Temanmu,<br />Ygritte'
        },
        {
          date: '-52704279520000',
          fromAddress: 'burhanarif99@gmail.com',
          fromName: 'burhanarif99',
          avatar: 'seminar.png',
          subject: 'pagi sayang',
          salutation: 'hai...',
          message: 'The other night was amaizing Jon Snow. I wish we could have stayed in that cave forever. You’re mine. Mine, as I’m yours. And if we die, we die. All men must die, Jon Snow. But first we’ll live.',
          signature: 'Forever yours,<br />Ygritte'
        },
        {
          date: '4 Juli 2019',
          fromAddress: 'andiarif@gmail.com',
          fromName: 'andiarif',
          avatar: 'email.png',
          subject: 'terima kasih',
          salutation: 'andi,',
          message: 'Lorem.....',
          signature: 'saudaramu,<br />Sam'
        },
        {
          date: '4 Juli 2019',
          fromAddress: 'ilhamyusuf@gmail.com',
          fromName: 'ilhamyusuf',
          avatar: 'seminar.png',
          subject: 'Informasi Perkuliahan',
          salutation: 'zufar,',
          message: 'Lorem',
          signature: 'Temanmu,<br />Robb'
        },
        {
          date: '-10 Juli 2019',
          fromAddress: 'fitadinasty@gmail.com',
          fromName: 'fitadinasty',
          avatar: 'seminar.png',
          subject: 'gimana kabarnya?',
          salutation: 'han,',
          message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.<br /><br/>',
          signature: 'Temanmu,<br />Arya'
        }
      ]
    },
    {
      userName: 'Bunga Permata',
      avatar: 'email.png',
      emailAddress: 'Bungapermata@gmail.coom',
      emails: []
    },
    {
      userName: 'fafan',
      avatar: 'utd.png',
      emailAddress: 'fafan@gmail.com',
      emails: []
    }
    ,
    {
      userName: 'adnan boy',
      avatar: 'utd.png',
      emailAddress: 'adnanboy@gmail.com',
      emails: []
    }

  ]
};
