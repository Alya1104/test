String.prototype.toMMSS = function () {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var minutes = Math.floor(sec_num / 60);
  var seconds = sec_num - minutes * 60;

  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }
  return minutes + ':' + seconds;
}


Vue.component('timer', {
  props: ['time'],
  data() {
    return {
      timer: null,
      remainingTime: this.time,
      isPaused: false
    };
  },
  computed: {
    remainingTimeMMSS() {
      return (this.remainingTime + "").toMMSS()
    }
  },
  watch: {
    time(newTime) {
      this.resetTimer(newTime);
    }
  },
  methods: {
    startTimer() {
      if (this.timer) return;
      this.timer = setInterval(() => {
        if (this.remainingTime > 0) {
          this.remainingTime--;
        } else {
          clearInterval(this.timer);
          this.timer = null;
          this.$emit('timeout');
        }
      }, 1000);
    },
    pauseTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
        this.isPaused = true;
      }
    },
    resumeTimer() {
      if (this.isPaused) {
        this.startTimer();
        this.isPaused = false;
      }
    },
    resetTimer(newTime) {
      clearInterval(this.timer);
      this.timer = null;
      this.remainingTime = newTime;
      this.isPaused = false;
     // this.startTimer();
    }

  },
  mounted() {
    //this.startTimer();
  },
  template: `
      <div>
        <span>{{ remainingTimeMMSS }}</span>
        <!--
        <button class="btn btn-primary btn-lg" @click="startTimer">Start</button>
        <button class="btn btn-primary btn-lg" @click="pauseTimer">Pause</button>
        <button class="btn btn-primary btn-lg" @click="resumeTimer">Resume</button>
        <button class="btn btn-primary btn-lg" @click="resetTimer(time)">Restart</button>
        -->
      </div>
    `
});

let data = null;

new Vue({
  el: '#app',
  data: {
    score:0,
    isNext:true,
    timerTime: 180,
    addTimerTime: 30,
    country: "Начните игру",
    capital: ""
  },
  methods: {
    handleTimeout(timerName) {
      switch (timerName) {
        case 'mainTimer':
          document.getElementById('startGame').disabled=true
          document.getElementById('nextQuestion').disabled=true
          this.stopGame();          

          break;
        case 'addTimer':
          this.nextQuestion();
          break;
      }
    },
    startGame() {
      //data={countries};
      data = JSON.parse(JSON.stringify(countries));
      document.getElementById("nextQuestion").disabled=false;
      document.getElementById("addScore").disabled=false;
      document.getElementById("removeScore").disabled=false;
      this.nextQuestion();
      this.$refs.mainTimer.startTimer();


    },
    stopGame() {
      alert('Game over!');
      this.$refs.addTimer.pauseTimer();
    },
    pauseGame() {

    },
    restartGame()
    {
      if (confirm("Перезапустить?"))
        window.location.reload();
    },
    nextQuestion() {
      randomCountry = getRandomElementAndRemove(data);
      this.country = randomCountry["Страна"];
      this.capital = "Показать";//randomCountry["Столица"];  
      this.$refs.addTimer.resetTimer(parseInt(document.getElementById("addTimer").value));
      this.$refs.addTimer.startTimer();
    },
    showCapital() {
      this.capital = randomCountry["Столица"];
    },
    addScore(score)
    {
      this.score+=score;
      if (this.isNext) this.nextQuestion();
    }
  }
});

function getRandomElementAndRemove(array) {
  if (array.length === 0) {
    return null; // Если массив пуст, возвращаем null
  }

  // Выбираем случайный индекс из массива
  const randomIndex = Math.floor(Math.random() * array.length);

  // Запоминаем случайный элемент
  const randomElement = array[randomIndex];

  // Удаляем элемент из массива
  array.splice(randomIndex, 1);

  return randomElement;
}


let isHintVisible = false;

function toggleHint() {
    const hintContent = document.querySelector('.hint-content');
    const hintToggle = document.querySelector('.hint-toggle');

    if (isHintVisible) {
        hintContent.style.display = 'none';
        hintToggle.textContent = 'Инструкция';
        isHintVisible = false;
    } else {
        hintContent.style.display = 'block';
        hintToggle.textContent = 'Спрятать';
        isHintVisible = true;
    }
}
