package com.chrizuuu.producitivityUp;
import android.content.Intent;
import android.os.Bundle;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;
import javax.annotation.Nullable;

public class pomodoroNotif extends HeadlessJsTaskService {
    @Override
    protected @Nullable HeadlessJsTaskConfig getTaskConfig(Intent intent) {
        Bundle extras = intent.getExtras();
        return new HeadlessJsTaskConfig(
                "pomodoroNotif", //JS function to call
                extras != null ? Arguments.fromBundle(extras) : null,
                1000,
                true);
    }
}
