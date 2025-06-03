"use strict"

const one_minute = 60000 // miliseconds
const def_break_length = 5 * one_minute
const def_session_length = 25 * one_minute
let break_length = def_break_length
let session_length = def_session_length
let time_left = session_length
let timer_label = 'Session' // or 'Break'
let interval_id = 0
let is_counting = false

let el_break_length = document.querySelector('#break-length')
let el_session_length = document.querySelector('#session-length')
let el_timer_label = document.querySelector('#timer-label')
let el_time_left = document.querySelector('#time-left')
let el_beep = document.querySelector('#beep')

document.querySelector('#session-decrement').addEventListener('click', () => {
   if (session_length > one_minute) {
      session_length -= one_minute
   }
   if (!is_counting) {
      time_left = session_length
      update_time_left()
   }
   update_session_length()
})
document.querySelector('#session-increment').addEventListener('click', () => {
   if (session_length < 60 * one_minute) {
      session_length += one_minute
   }
   if (!is_counting) {
      time_left = session_length
      update_time_left()
   }
   update_session_length()
})
document.querySelector('#break-decrement').addEventListener('click', () => {
   if (break_length > one_minute) {
      break_length -= one_minute
   }
   update_break_length()
})
document.querySelector('#break-increment').addEventListener('click', () => {
   if (break_length < 60 * one_minute) {
      break_length += one_minute
   }
   update_break_length()
})
document.querySelector('#start_stop').addEventListener('click', () => {
   if (is_counting) {
      is_counting = false
      window.clearInterval(interval_id)
   } else {
      is_counting = true
      interval_id = window.setInterval(countdown, 1000)
   }
})
document.querySelector('#reset').addEventListener('click', () => {
   if (is_counting) {
      window.clearInterval(interval_id)
   }
   el_beep.pause()
   el_beep.currentTime = 0
   is_counting = false
   break_length = def_break_length
   update_break_length()
   session_length = def_session_length
   update_session_length()
   time_left = session_length
   update_time_left()
   update_timer_label('Session')
})

function countdown() {
   if (time_left < 1000) {
      time_left = 0
      update_time_left()
      el_beep.play()
      if (timer_label === 'Session') {
         time_left = break_length
         update_timer_label('Break')
      } else {
         time_left = session_length
         update_timer_label('Session')
      }
      update_time_left()
   } else {
      time_left -= 1000
      update_time_left()
   }
}

function update_break_length() {
   let x = Math.floor(break_length / one_minute)
   el_break_length.textContent = x.toString(10)
}

function update_session_length() {
   let x = Math.floor(session_length / one_minute)
   el_session_length.textContent = x.toString(10)
}

function update_time_left() {
   let minutes = Math.floor(time_left / one_minute)
   let seconds = Math.floor((time_left - minutes * one_minute) / 1000)
   if (minutes < 10) {
      minutes = '0'.concat(minutes.toString(10))
   } else {
      minutes = minutes.toString(10)
   }
   if (seconds < 10) {
      seconds = '0'.concat(seconds.toString(10))
   } else {
      seconds = seconds.toString(10)
   }
   el_time_left.textContent = minutes.concat(':', seconds)
}

function update_timer_label(label) {
   timer_label = label
   el_timer_label.textContent = timer_label
}
