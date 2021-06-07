<FlexLayout>
<Text>Pomodoro Timer</Text>
<Icon  name='settings' iconStyle = {{color:"black"}} size={28} /> 
<Text>Pomodoro Timer!</Text>
<Text>{this.state.type.name}</Text>
<Text style={styles.timerValue}>{formatTime(this.state.time)} </Text>
<Text>{strings("timerIntervalRound")}{this.state.countInterval}</Text>
<ControlsButton
start = {this.startTimer}
pause= {this.pauseTimer}
skip = {this.skipTimer}
status = {this.state.status}>    
</ControlsButton>
</FlexLayout>