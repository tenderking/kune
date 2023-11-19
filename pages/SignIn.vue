<script setup lang="ts">
useHead({
  title: 'Login Page',
})

// const email = ref('')
// const password = ref('')

// const isValid = computed(() => {
//   return email.value && password.value
// })

// const redirectTo = useAuth().redirectTo.value
// const alert = ref(
//   `Please login or register ${redirectTo ? `to access ${redirectTo}` : ''}`,
// )

// function showAlert(message: string) {
//   alert.value = message
//   setTimeout(() => {
//     alert.value = ''
//   }, 1500)
// }

// function onError(err: any) {
//   showAlert(err?.data.message ?? err?.message ?? err)
// }
</script>

<template>
  <FormLayout>
    <div class="sign-in-container">
      <form action="">
        <div class="input-container">
          <label>Email:</label>
          <input id="sign-in-email" v-model="email" type="email" name="email" placeholder="type your email">
        </div>
        <div class="input-container">
          <label>Password:</label>
          <input id="sign-in-password" v-model="password" type="password" name="password" placeholder="password">
        </div>
        <button :disabled="!isValid" @click="authLogin(email, password).catch(onError)">
          SignIn
        </button>
      </form>
    </div>
  </FormLayout>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.input-container {
  display: flex;
  flex-direction: column;
}
form {
    display: flex;
    flex-direction: column;
    width: 500px;
}

label {
    display: block;
    margin-bottom: 5px;
     margin-top: 1em;
}

input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: var(--radius-sm);
}

textarea {
    width: 100%;
    height: 100px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: var(--radius-sm);

}

input[type="submit"] {
    background-color: var(--clr--primary);
    color: var(--clr--text);
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: var(--radius-sm);
    margin-top: 1em;
}
</style>
