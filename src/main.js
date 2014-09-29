(function(){  

  // Create your component here
  // http://x-tags.org/docs
  var optionTemplate = '<option value="{#value#}">{#team_name#}</option>';
  var leagueUrl = 'http://sportswebapi.qq.com/tools/competition?random=';
  var teamUrl = 'http://sportswebapi.qq.com/footballTeam/list?AppVersion=1.1&competitionId=';
  function renderOptions (url) {
    $.ajax({
      url: url,
      dataType: 'jsonp',
      jsonp: 'callback',
      method: 'get',
    })
    .done(function (data) {
      console.log(data);
    });
  }

  xtag.register('x-team-selector', {
    lifecycle: {
      created: function() {
        console.log('created');
        var self = this;
        var ls = document.createElement('select');
        ls.setAttribute('id', 'ts-league');
        ls.innerHTML = '<option selected>loading...</option>';
        self.appendChild(ls);
        $.ajax({
          url: leagueUrl,
          dataType: 'jsonp',
          jsonp: 'callback',
          method: 'get',
        })
        .done(function (data) {
          var options = '';
          data[1].forEach(function (value) {
            options = options.concat(
              optionTemplate.replace('{#value#}', value.id)
              .replace('{#team_name#}', value.shortName));
          });
          ls.innerHTML = options;
        });
      },
      inserted: function() {
        console.log('inserted');
        // renderOptions('http://sportswebapi.qq.com/tools/competition?random=' + Math.random());
      },
      removed: function() {
        console.log('removed');
      },
      attributeChanged: function() {
        console.log('attributeChanged');
      }
    }, 
    events: {
      change: function (e) {
        var self = this;
        console.log('change');
        if (e.target.id === 'ts-league') {
          var leagueId = e.target.value;
          var ts = document.getElementById('ts-team') || document.createElement('select');
          ts.setAttribute('id', 'ts-team');
          ts.innerHTML = '<option selected>loading...</option>';
          self.appendChild(ts);
          $.ajax({
            url: teamUrl + leagueId + '&random=' + Math.random(),
            dataType: 'jsonp',
            jsonp: 'callback',
            method: 'get',
          })
          .done(function (data) {
            var options = '';
            data[1].forEach(function (value) {
              options = options.concat(
                optionTemplate.replace('{#value#}', value.teamId)
                .replace('{#team_name#}', value.name));
            });
            ts.innerHTML = options;
          });
        }
      }
    },
    accessors: {
      
    }, 
    methods: {
      
    }
  });

})();
