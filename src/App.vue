<template>
  <div class="container">
    <div class="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
      <div class="d-flex align-items-center flex-shrink-0 text-decoration-none">
        <div class="h2 col-6 titel1">Chat</div>
        <!-- input username -->
        <input class="inputfield1 fw-semibold col-6" placeholder="Gebruikersnaam" v-model="username"/>
      </div>
      <!-- input zoeken -->
      <div class="d-flex align-items-center flex-shrink-0 text-decoration-none inputfield2 col-12">
        <i class="fa fa-search searchicon"></i><div class="textzoeken">Zoeken in gesprek</div>
      </div>
       <!-- Scrollarea + messages -->
      <div class="list-group list-group-flush border-bottom border-top scrollarea">
        <div class="list-group-item list-group-item-action py-3 lh-tight msg1" v-for="message in messages" :key="message">
           <!-- Username message -->
          <div class="d-flex w-100 align-items-center justify-content-between">
            <strong class="mb-1">{{ message.username }}</strong>
          </div>
           <!-- Content message -->
          <div class="col-10 mb-1 small">{{ message.message }}</div>
        </div>
      </div>
    </div>
    <!-- Form input message en knop -->
    <form @submit.prevent="submit">
      <input class="form-control" placeholder="Type een bericht!" v-model="message" />
      <button class="btn btn-primary button1" type="button" v-on:click="submit"><i class="fa fa-paper-plane"
          aria-hidden="true"></i></button>
    </form>
  </div>
</template>
<script>
//import the vue instance and Pusher Database
  import {
    ref,
    onMounted
  } from 'vue';
  import Pusher from 'pusher-js';

  export default {
    name: 'App',
    setup() {
      //variabeles
      const username = ref('');
      const messages = ref([]);
      const message = ref('');

      onMounted(() => {
        Pusher.logToConsole = true;
        
        //unique key for Pusher
        const pusher = new Pusher('3d4cf2aefca809e0f444', {
          cluster: 'eu'
        });

        //binding data from Form to database
        const channel = pusher.subscribe('chat');
        channel.bind('message', data => {
          messages.value.push(data);
        });
      })

      //Post method message to port:8000
      const submit = async () => {
        await fetch('http://localhost:8000/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: username.value,
            message: message.value
          })
        })

        message.value = '';
      }

      //returning with new values
      return {
        username,
        messages,
        message,
        submit
      }
    }
  }

</script>

<style>
  .container {
    max-width: 500px;
    color: #003580;
    background: #FFFFFF;
    padding: 20px;
    margin-top: 50px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.12), 0px -2px 4px rgba(0, 0, 0, 0.12);
    border-radius: 15px 15px 15px 15px;
  }

  .form {
    color: #003580;
  }
  .inputfield1{
    font-size: 1rem;
    padding: 5px 5px 5px 12px;
    color: #646464;
    border-width: 1px;
    border-style:solid;
    border-color:#E6EBF3;
    border: 1px solid #E6EBF3 !important;
      border-radius: 15px;
  }

  .list-group-item {
    color: #003580;
  }

  .scrollarea {
    min-height: 500px;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .form-control {
    max-width: 410px !important;
    display: inline-block;

  }

  .button1 {
    background-color: #E6EBF3;
    border-color: #E6EBF3;
    color: #003580;
    border-radius: 15px;
    vertical-align: top;
    margin-left: 5px;
  }

  .button1:hover {
    background-color: #003580;
  }

  .msg1{
    background-color: #E6EBF3;
    border-radius: 10px;
    margin-top: 5px;
  }
  .titel1{
    color:#003580;
    font-weight: bold;
  }
  .inputfield2{
      margin-top: 10px;
      padding: 5px 5px 5px 8px;
      color:#003580;
      background-color: #E6EBF3;
      border: none;
      border-radius: 15px;
      height: 35px;
  }
  .textzoeken{
    margin-left: 10px;
  }
  .searchicon{
    margin-left: 10px;
  }

.list-group-flush>.list-group-item {
    border-width: 0 0 1px;
    border-radius: 15px;
}
.border-bottom {
    border-bottom: 1px solid #E6EBF3!important;
}
.form-control{
      border: 1px solid #E6EBF3 !important;
      border-radius: 15px;
}
</style>