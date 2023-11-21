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
    <p style="text-align: center; margin-bottom: 10px; font-size: 20px">
      Registration
    </p>

    <FormKit
      type="email"
      name="email"
      help="Please enter your email address."
      validation="required|email|ends_with:.com"
      validation-visibility="dirty"
      placeholder="Email"
    />

    <FormKit
      type="text"
      name="password"
      help="Please enter password address."
      validation="required"
      validation-visibility="dirty"
      placeholder="Password"
    />

    <p
      style="
        text-align: center;
        color: grey;
        margin-bottom: 10px;
        font-size: 14px;
      "
    >
      Already have an account?
      <RouterLink style="text-decoration: none; color: slateblue" to="/signin"
        >Sign In</RouterLink
      >
    </p>
  </FormKit>
</template>

<script>
import router from "@/router";

export default {
  methods: {
    async handleSubmit(data) {
      await this.$store.dispatch("SignUp", data);
      router.push("/board");
    },
  },
};
</script>

<style>
.formkit-wrapper {
  text-align: center;
}
</style>
