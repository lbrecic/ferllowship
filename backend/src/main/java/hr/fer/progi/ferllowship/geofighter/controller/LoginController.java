package hr.fer.progi.ferllowship.geofighter.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
	
	@PostMapping(path = "/login")
	public Map<String, String> login(
			@RequestPart("username") String username,
			@RequestPart("password") String password) throws IOException {
		
		Map<String, String> response = new HashMap<>();
		response.put("success", "Uspješno autorizirano!");
		return response;
	}
	
}
