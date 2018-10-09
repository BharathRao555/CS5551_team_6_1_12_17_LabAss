package com.example.hiresh.labassignment2;

import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.Toast;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.AuthResult;

public class LoginActivity extends AppCompatActivity {

    private FirebaseAuth auth;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        auth = FirebaseAuth.getInstance();
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
    }
    protected void Login(View v){
        String email = ((EditText) findViewById(R.id.txtuser)).getText().toString();
        final String password = ((EditText) findViewById(R.id.txtpass)).getText().toString();
         auth.signInWithEmailAndPassword(email, password)
                .addOnCompleteListener(LoginActivity.this, new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        // If sign in fails, display a message to the user. If sign in succeeds
                        // the auth state listener will be notified and logic to handle the
                        // signed in user can be handled in the listener.
                        //progressBar.setVisibility(View.GONE);
                        if (!task.isSuccessful()) {
                            // there was an error
                            if (password.length() < 6) {
                                //inputPassword.setError(getString(R.string.minimum_password));
                            } else {
                                Toast.makeText(LoginActivity.this, "failes", Toast.LENGTH_LONG).show();
                            }
                        } else {
                            //Intent intent = new Intent(LoginActivity.this, MainActivity.class);
                            //startActivity(intent);
                            Toast.makeText(LoginActivity.this, "pass", Toast.LENGTH_LONG).show();
                            finish();
                        }
                    }
                });
    }
}
