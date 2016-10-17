import React from 'react';

export default class TodosListItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isEditing: false
		};
	}

	renderTaskSection() {
		const { task, isCompleted } = this.props;
		const taskStyle = {
			color: isCompleted ? 'green' : 'red',
			cursor: 'pointer'
		};
		if(this.state.isEditing){
			return (
				<td>
					<form onSubmit={this.onSaveClick.bind(this)}>
						<input type='text' defaultValue={task} ref='editInput' />
					</form>
				</td>
			);
		}
		return(
			<td style={taskStyle}
				onClick={this.props.toggleTask.bind(this, task)}
			>
				{task}
			</td>

		)
	}

	renderActionSection() {
		if (this.state.isEditing) {
			return (
				<td>
					<p>
						<button type="button" className="btn btn-primary btn-sm" onClick={this.onSaveClick.bind(this)}>Save</button>
						<button type="button" className="btn btn-danger btn-sm" onClick={this.onCancelClick.bind(this)}>Cancel</button>
					</p>
				</td>
			);
		}

		return (
			<td>
				<p>
					<button type="button" className="btn btn-primary btn-sm" onClick={this.onEditClick.bind(this)}>Edit</button>
					<button type="button" className="btn btn-danger btn-sm" onClick={this.props.deleteTask.bind(this, this.props.task)}>Delete</button>
				</p>
			</td>
		);
	}

	render(){
		return(
			<tr>
				{this.renderTaskSection()}
				{this.renderActionSection()}
			</tr>
		);
	}

	onEditClick() {
		this.setState({ isEditing: true });
	}

	onCancelClick() {
		this.setState({ isEditing: false });
	}

	onSaveClick(event) {
		event.preventDefault();
		const oldTask=this.props.task;
		const newTask=this.refs.editInput.value;
		this.props.saveTask(oldTask, newTask);
		this.setState({ isEditing: false })
	}
}