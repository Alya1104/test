Vue.component('timer', {
    props: ['time'],
    data() {
      return {
        timer: null,
        remainingTime: this.time,
        isPaused: false
      };
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
        this.startTimer();
      }
    },
    mounted() {
      //this.startTimer();
    },
    template: `
      <div>
        <p>Time remaining: {{ remainingTime }} seconds</p>
        <button @click="startTimer">Start</button>
        <button @click="pauseTimer">Pause</button>
        <button @click="resumeTimer">Resume</button>
        <button @click="resetTimer(time)">Restart</button>
      </div>
    `
  });


  new Vue({
    el: '#app',
    data: {
        timerTime: 180
    },
    methods: {
        handleTimeout() {
            alert('Time is up!');
          }
    }
});

/*
Vue.component('timer', {
  // Определяем компонент Vue с именем 'timer'

  props: ['time'],
  // Определяем свойство 'time', которое будет передаваться в компонент.
  // Это свойство указывает начальное время таймера в секундах.

  data() {
    return {
      timer: null,
      // Переменная для хранения идентификатора таймера, возвращаемого setInterval

      remainingTime: this.time,
      // Переменная для хранения оставшегося времени таймера, инициализируется значением свойства 'time'

      isPaused: false
      // Флаг, указывающий, находится ли таймер в состоянии паузы
    };
  },

  watch: {
    // Наблюдатель за изменением свойства 'time'
    time(newTime) {
      this.resetTimer(newTime);
      // Если значение 'time' изменяется, вызывается метод resetTimer с новым значением времени
    }
  },

  methods: {
    startTimer() {
      if (this.timer) return;
      // Если таймер уже запущен, выходим из метода

      this.timer = setInterval(() => {
        // Запускаем интервал, который будет выполняться каждую секунду

        if (this.remainingTime > 0) {
          this.remainingTime--;
          // Уменьшаем оставшееся время на 1 секунду
        } else {
          clearInterval(this.timer);
          // Если время истекло, останавливаем таймер

          this.timer = null;
          // Сбрасываем идентификатор таймера

          this.$emit('timeout');
          // Вызываем событие 'timeout', чтобы уведомить родительский компонент о завершении времени
        }
      }, 1000);
    },

    pauseTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        // Останавливаем таймер

        this.timer = null;
        // Сбрасываем идентификатор таймера

        this.isPaused = true;
        // Устанавливаем флаг паузы в true
      }
    },

    resumeTimer() {
      if (this.isPaused) {
        this.startTimer();
        // Возобновляем таймер, если он был на паузе

        this.isPaused = false;
        // Сбрасываем флаг паузы
      }
    },

    resetTimer(newTime) {
      clearInterval(this.timer);
      // Останавливаем таймер

      this.timer = null;
      // Сбрасываем идентификатор таймера

      this.remainingTime = newTime;
      // Устанавливаем новое значение времени

      this.isPaused = false;
      // Сбрасываем флаг паузы

      this.startTimer();
      // Запускаем таймер с новым значением времени
    }
  },

  mounted() {
    this.startTimer();
    // Запускаем таймер при монтировании компонента
  },

  template: `
    <div>
      <p>Time remaining: {{ remainingTime }} seconds</p>
      <!-- Отображаем оставшееся время -->

      <button @click="startTimer">Start</button>
      <!-- Кнопка для запуска таймера -->

      <button @click="pauseTimer">Pause</button>
      <!-- Кнопка для паузы таймера -->

      <button @click="resumeTimer">Resume</button>
      <!-- Кнопка для возобновления таймера -->

      <button @click="resetTimer(time)">Reset</button>
      <!-- Кнопка для сброса таймера на начальное значение -->
    </div>
  `
});
*/