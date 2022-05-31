import React, { Component } from 'react';
import './App.css';
import cities from './cities.json';

export default class Form extends Component {
	constructor() {
		super();
		this.state = {
			phone: "",
			// validPhone: false
		};
		this.onChangePhone = this.onChangePhone.bind(this);
	}

	onChangePhone(e) {
		var valid = false;

		var formatPhone = e.target.value
		formatPhone = formatPhone.replace(/\D/g, '');

		if (formatPhone.length === 11)
			formatPhone = formatPhone.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '($2) $3-$4-$5');
		else
			formatPhone = formatPhone.replace(/(\d{3})(\d{3})(\d{2})(\d{2})/, '($1) $2-$3-$4');

		this.setState({
			phone: formatPhone
		});

		var pattern = /\(\d{3}\) \d{3}-\d{2}-\d{2}$/;
		// var pattern = /(\+?7 |8 )?\([0-9]{3}\) [0-9]{3}-[0-9]{2}-[0-9]{2}$/;
		if (pattern.test(formatPhone))
			valid = true;
		// this.setState({
		// 	validPhone: valid
		// });
		console.log(formatPhone, valid);
	}

	render() {
		return (
			<div id="formDiv">
				<h2>Обратная связь</h2>
				<form action="/feedback" method="POST">
					<label htmlFor="name">Имя</label>
					<input name="name" type="text" placeholder="Имя" required/>

					<label htmlFor="city">Город</label>
					<select name="city" defaultValue="">
					 	<option value="" disabled>Выберите город</option>
						{cities.map((e, key) => 
							<option key={key} value={e.value}>{e.name}</option>
						)}
					</select>

					<label htmlFor="phone">Телефон</label>
					<input name="phone" type="tel" placeholder="(999) 999-99-99" pattern="\(\d{3}\) \d{3}-\d{2}-\d{2}$" value={this.state.phone} onChange={this.onChangePhone}/>
					
					<label htmlFor="email">Email</label>
					<input name="email" type="email" placeholder="your@email.ru" pattern="^[a-zA-Z0-9.-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9]{2,63}$"/>
					
					<label htmlFor="topic">Выберите тему вашего вопроса</label>
					<select name="topic" defaultValue="">
					 	<option value="" disabled>Выберите тему</option>
						<option value="topic_1">topic 1</option>
						<option value="topic_2">topic 2</option>
						<option value="topic_3">topic 3</option>
					</select>
					
					<label htmlFor="contact_method">Предпочитаемый способ связи</label>
					<select name="contact_method" defaultValue="">
					 	<option value="" disabled>Выберите способ связи</option>
						<option value="email">Email</option>
						<option value="text_message">СМС</option>
						<option value="call">Звонок</option>
					</select>
					
					<label htmlFor="feedback">Текст</label>
					<textarea name="feedback" placeholder="Введите текст" required></textarea>

					<input className="check" name="agreement" type="checkbox"required/>
					<label className="check" htmlFor="agreement">Нажимая на кнопку "отправить", я даю согласие на обработку персональных данных</label>

					<button type="submit">Отправить</button>
				</form>
			</div>
		)
	}
}