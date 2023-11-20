<template>
  <FormKit
    type="form"
    :value="{
      email: '',
      password: '',
    }"
    submit-label="Submit"
    style="width: 400px; margin: 300px auto"
    @submit="handleSubmit"
  >
    <p style="text-align: center; margin-bottom: 10px; color: grey">Login</p>

    <FormKit
      type="email"
      name="email"
      help="Please enter your email address."
      validation="required|email|ends_with:.com"
      validation-visibility="dirty"
      placeholder="nikita@gmail.com"
    />

    <FormKit
      type="text"
      name="password"
      help="Please enter password address."
      validation="required"
      validation-visibility="dirty"
    />
  </FormKit>
</template>

<script>
import router from "@/router";

export default {
  methods: {
    handleSubmit(credentials) {
      console.log(credentials);
      router.push("/home");
    },
  },
};
</script>

<style>
.formkit-wrapper {
  text-align: center;
}
</style>
