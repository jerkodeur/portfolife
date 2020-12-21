import React, {Component} from "react"
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';
import toaster from 'toasted-notes'

import Toast from './../common/Toast'
import 'toasted-notes/src/styles.css';

class ContactOne extends Component {
    state = {
        rnName: '',
        rnEmail: '',
        rnSubject: '',
        rnMessage: '',
        errors: []
    };

    handleSubmit = (event) => {
        this.setState({errors: []})
        event.preventDefault()

        const {rnName, rnEmail, rnSubject, rnMessage} = this.state
        const fields = [{rnName: rnName}, {rnEmail: rnEmail}, {rnSubject: rnSubject}, {rnMessage: rnMessage}]
        const errors = []

        fields.map(field => {
            const key = Object.keys(field);
            const value = Object.values(field);

            const emailRegEx = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/

            if(value[0].length === 0) {
                errors.push({[key[0]]: 'empty'})
            } else if(key[0] === 'rnEmail' && !emailRegEx.test(value)) {
                errors.push({[key[0]]: 'syntax'})
            }
            this.setState({errors: errors})
        })
        if (errors.length === 0){
            const templateId = 'porfolife_message'

            this.sendFeedback(templateId, {subject: this.state.rnSubject, message: this.state.rnMessage, contact_name: this.state.rnName, reply_to: this.state.rnEmail, contact_mail: this.state.rnEmail})
        }
        else {
            toaster.notify(<Toast styleType='toaster-fail' content="Des erreurs ont été détectées !" />, { position: 'top-right', duration: 5000})
        }
    }

    sendFeedback = (templateId, variables) => {

        init("user_6OIcVDaq2eGBjk8PV1KBA");
        // console.log(window);
        emailjs.send(
            'gmail', templateId,
            variables
        ).then(res => {
            this.setState({rnEmail: '', rnMessage: '', rnSubject: '', rnName: ''})
            return toaster.notify(<Toast styleType='toaster-success' content="Votre message a bien été envoyé !" />, { position: 'top-right', duration: 5000})
        })
        // Handle errors here however you like, or use a React error boundary
        .catch(err =>
            toaster.notify(<Toast content="Une erreur est survenue, veuillez réessayer ou contacter l'administrateur" styleType="toaster-fail" />, { position: 'top-right', duration: 5000})
        )
    }

    handleFormErrors = (field) => {
        let message
        let message2

        switch (field) {
            case 'rnName':
                message = "Veuillez renseigner votre nom"
                break;

            case 'rnEmail':
                message = "Votre adresse e-mail est nécessaire"
                message2 = "Le format de l'adresse e-mail n'est pas valide"
                break;

            case 'rnSubject':
                message = "Veuillez renseigner un sujet à votre message"
                break;

            case 'rnMessage':
                    message = "Le champ message est obligatoire"
                    break;

            default:
                break;
        }

        const error = this.state.errors.filter(value => Object.keys(value)[0] === field)

        if(error.length > 0){
            if(field === 'rnEmail'){
                const empty = Object.values(error).filter(value => Object.values(value).includes('empty'));
                return empty.length > 0 ? message : message2
            } else {
                return message
            }
        }
    }

    render () {

        return (
            <div className="contact-form--1">
                <div className="container">
                    <div className="row row--35 align-items-start">
                        <div className="col-lg-8 order-2 order-lg-1">
                            <div className="section-title text-center mb--50 mt--60">
                                <h2 className="title">Contactez-moi</h2>
                                <p className="description">Je suis disponible pour un entretien téléphonique au: <a href="tel:0660814774">06.60.81.47.74</a> ou par mail:
                                    <a href="mailto:jerome.potie@gmail.com"> jerome.potie@gmail.com</a> </p>
                            </div>
                            <div className="form-wrapper">
                                <form onSubmit={this.handleSubmit}>
                                    <label htmlFor="item01">Nom *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={this.state.rnName}
                                            onChange={(e) => {this.setState({rnName: e.target.value})}}
                                            placeholder="Quel est votre nom"
                                        />
                                        <small className="form-errors">{this.handleFormErrors('rnName')}</small>

                                    <label htmlFor="item02">E-mail *</label>
                                        <input
                                            type="text"
                                            name="email"
                                            id="mail"
                                            value={this.state.rnEmail}
                                            onChange={(e) => {this.setState({rnEmail: e.target.value})}}
                                            placeholder="Adresse e-mail à laquelle je pourrais vous joindre"
                                        />
                                        <small className="form-errors">{this.handleFormErrors('rnEmail')}</small>

                                    <label htmlFor="item03">Sujet *</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            id="subject"
                                            value={this.state.rnSubject}
                                            onChange={(e) => {this.setState({rnSubject: e.target.value})}}
                                            placeholder="Indiquez le sujet de votre message"
                                        />
                                        <small className="form-errors">{this.handleFormErrors('rnSubject')}</small>

                                    <label htmlFor="item04">Message *</label>
                                        <textarea
                                            type="text"
                                            id="message"
                                            name="message"
                                            value={this.state.rnMessage}
                                            onChange={(e) => {this.setState({rnMessage: e.target.value})}}
                                            placeholder="Inscrivez ici le contenu de votre message"
                                        />
                                        <small className="form-errors">{this.handleFormErrors('rnMessage')}</small>

                                    <div className="m-auto w-100 text-center">
                                        <button className="rn-button-style--2 btn-solid" type="submit" value="submit" name="submit" id="mc-embedded-subscribe">Envoyer</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-4 order-1 order-lg-2 mt--125">
                            <div className="thumbnail">
                                <img src="/assets/images/about/about-6.jpg" alt="contact"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ContactOne