<template>
    <Page actionBarHidden="true">
        <FlexboxLayout class="page">
            <StackLayout class="form">
                <Image class="logo" src="~/img/icon.png"/>
                <Label class="header" text="Smart Task"/>

                <StackLayout class="input-field" marginBottom="25">
                    <TextField class="input" hint="Email" keyboardType="email" autocorrect="false"
                               autocapitalizationType="none" v-model="user.email"
                               returnKeyType="next" @returnPress="focusPassword" fontSize="18"/>
                    <StackLayout class="hr-light"/>
                </StackLayout>

                <StackLayout v-show="!isLoggingIn" class="input-field" marginBottom="25">
                    <TextField class="input" hint="Prénom" autocorrect="false"
                               autocapitalizationType="none" v-model="user.prenom"
                               fontSize="18"/>
                    <StackLayout class="hr-light"/>
                </StackLayout>

                <StackLayout v-show="!isLoggingIn" class="input-field" marginBottom="0">
                    <TextField class="input" hint="Nom" autocorrect="false"
                               autocapitalizationType="none" v-model="user.nom"
                               fontSize="18"/>
                    <StackLayout class="hr-light"/>
                </StackLayout>
                <StackLayout v-show="!isLoggingIn" class="ListPickerGender">
                    <ListPicker :items="listOfItems" v-model="user.gender"/>
                </StackLayout>


                <StackLayout v-show="isLoggingIn" class="input-field" marginBottom="25">
                    <TextField ref="password" class="input" hint="Mot de passe" secure="true" v-model="user.password"
                               :returnKeyType="isLoggingIn ? 'done' : 'next'"
                               @returnPress="focusConfirmPassword" fontSize="18"/>
                    <StackLayout class="hr-light"/>
                </StackLayout>

                <Button v-if="isLoggingIn" text="Se connecter" @tap="login" class="btn btn-primary m-t-20"/>
                <Button v-else text="S'enregistrer" @tap="register" class="btn btn-primary m-t-20"/>
            </StackLayout>

            <Label class="login-label sign-up-label" @tap="toggleForm">
                <FormattedString>
                    <Span :text="isLoggingIn ? 'Pas de compte? ' : 'Se connecter'"/>
                    <Span :text="isLoggingIn ? 'Créer un compte' : ''" class="bold"/>
                </FormattedString>
            </Label>
        </FlexboxLayout>
    </Page>
</template>

<script>
    import {decode, encode} from 'base-64'

    if (!global.btoa) {
        global.btoa = encode;
    }

    if (!global.atob) {
        global.atob = decode;
    }
    import axios from "axios";
    import Home from "./Home";
    const connectivity = require("tns-core-modules/connectivity");
    export default {
        data() {
            return {
                networkStatus: "",
                isLoggingIn: true,
                listOfItems: [
                    "Homme", "Femme"
                ],
                user: {
                    email: "",
                    gender: 0,
                    password: "",
                    prenom: "",
                    nom: "",
                }
            };
        },
        components: {
            Home,
        },
        methods: {
            toggleForm() {
                this.isLoggingIn = !this.isLoggingIn;
            },
            checkNetwork() {
                const connectionType = connectivity.getConnectionType();
                switch (connectionType) {
                    case connectivity.connectionType.none:
                        console.log("No network connection available!");
                        this.$store.commit("setConnectivity",false);
                        break;
                    case connectivity.connectionType.wifi:
                        console.log("You are on wifi!");
                        this.$store.commit("setConnectivity",true);

                        break;
                    case connectivity.connectionType.mobile:
                        console.log("You are on a mobile data network!");
                        this.$store.commit("setConnectivity",true);
                        break;
                }
            },
            login() {
                console.log('login');

                if (!this.user.email || !this.user.password) {
                    this.alert(
                        "Veuillez saisir un mail et un mot de passe."
                    );
                    return;
                }
                axios.post("https://api.todolist.sherpa.one/users/signin", {},{
                    auth : {
                        username: this.user.email,
                        password: this.user.password,
                    }
                }).then((result) => {
                    this.$store.commit("setToken",result.data.token);
                    this.$store.commit("setUuid",result.data.user.uuid);
                    this.isLoggingIn = true;
                    console.log(result.data);
                    this.$navigateTo(Home);
                }).catch((err) => {
                    console.log(err.message);
                })

            },

            register() {
                console.log('register');
                if (!this.user.email || !this.user.nom || !this.user.prenom) {
                    this.alert(
                        "Veuillez saisir un mail, un nom et un prénom."
                    );
                    return;
                }
                let gender = this.user.gender ? "male" : "female";
                axios.post("https://api.todolist.sherpa.one/users/signup", {
                    email: this.user.email,
                    firstname: this.user.prenom,
                    lastname: this.user.nom,
                    gender: gender
                }).then((result) => {
                    console.log(result.data.password);
                    this.user.password = result.data.password;
                    this.isLoggingIn = true;
                }).catch((err) => {
                    console.log(err.message);
                })
            },
            focusPassword() {
                this.$refs.password.nativeView.focus();
            },
            focusConfirmPassword() {
                if (!this.isLoggingIn) {
                    this.$refs.confirmPassword.nativeView.focus();
                }
            },

            alert(message) {
                return alert({
                    title: "Liste Detail",
                    okButtonText: "OK",
                    message: message
                });
            }
        },
        created(){
            this.checkNetwork();
        }
    };
</script>

<style scoped>

    .ListPickerGender {
        height: 130em;
    }

    .hr-light {
        width: 90%;
    }

    .page {
        align-items: center;
        flex-direction: column;
    }

    .form {
        margin-left: 30;
        margin-right: 30;
        flex-grow: 2;
        vertical-align: middle;
    }

    .logo {
        margin-bottom: 2%;
        margin-top: 2%;
        height: 90;
        font-weight: bold;
    }

    .header {
        horizontal-align: center;
        font-size: 25;
        font-weight: 600;
        margin-bottom: 2%;
        text-align: center;
        color: #54BA82;
    }

    .input-field {
        margin-bottom: 25;
    }

    .input {
        font-size: 18;
        placeholder-color: #A8A8A8;
    }

    .input-field .input {
        font-size: 54;
    }

    .btn-primary {
        height: 50;
        margin: 0;
        color: white;
        background-color: #54BA82;
        border-radius: 5;
        font-size: 20;
        font-weight: 600;
    }

    .login-label {
        horizontal-align: center;
        color: #A8A8A8;
        font-size: 16;
    }

    .sign-up-label {
        margin-bottom: 20;
    }

    .bold {
        color: #000000;
    }
</style>
