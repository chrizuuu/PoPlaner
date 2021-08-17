                    <TextInput 
                            style={{borderColor: 'black', borderWidth: 1}}
                            name="input"
                            defaultValue={this.task.comment}
                            onChangeText = {(input) => this.changeHandler(input)}
                            onSubmitEditing={() => {
                                this.submitHandler()
                            }}
                    />    