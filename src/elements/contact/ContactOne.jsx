import React, { Component } from "react";

class ContactOne extends Component{
        state = {
            rnName: '',
            rnEmail: '',
            rnSubject: '',
            rnMessage: '',
        };
    render(){
        return(
            <div className="contact-form--1">
                <div className="container">
                    <div className="row row--35 align-items-start">
                        <div className="col-lg-8 order-2 order-lg-1 m-auto">
                            <div className="section-title text-center mb--50 mt--60">
                                <h2 className="title">Contactez-moi</h2>
                                <p className="description">Je suis disponible pour un entretien téléphonique au: <a href="tel:0660814774">06.60.81.47.74</a> ou par mail:
                                    <a href="mailto:jerome.potie@gmail.com"> jerome.potie@gmail.com</a> </p>
                            </div>
                            <div className="form-wrapper">

                                <form>
                                    <label htmlFor="item01">
                                        <input
                                            type="text"
                                            name="name"
                                            id="item01"
                                            value={this.state.rnName}
                                            onChange={(e)=>{this.setState({rnName: e.target.value});}}
                                            placeholder="Votre nom *"
                                        />
                                    </label>

                                    <label htmlFor="item02">
                                        <input
                                            type="text"
                                            name="email"
                                            id="item02"
                                            value={this.state.rnEmail}
                                            onChange={(e)=>{this.setState({rnEmail: e.target.value});}}
                                            placeholder="Votre email *"
                                        />
                                    </label>

                                    <label htmlFor="item03">
                                        <input
                                            type="text"
                                            name="subject"
                                            id="item03"
                                            value={this.state.rnSubject}
                                            onChange={(e)=>{this.setState({rnSubject: e.target.value});}}
                                            placeholder="Sujet du message *"
                                        />
                                    </label>
                                    <label htmlFor="item04">
                                        <textarea
                                            type="text"
                                            id="item04"
                                            name="message"
                                            value={this.state.rnMessage}
                                            onChange={(e)=>{this.setState({rnMessage: e.target.value});}}
                                            placeholder="Votre message *"
                                        />
                                    </label>
                                    <div class="m-auto w-100">
                                        <button className="rn-button-style--2 btn-solid" type="submit" value="submit" name="submit" id="mc-embedded-subscribe">Envoyer</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ContactOne;