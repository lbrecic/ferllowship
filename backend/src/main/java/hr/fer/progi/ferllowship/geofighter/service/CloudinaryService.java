package hr.fer.progi.ferllowship.geofighter.service;

import java.io.IOException;
import java.io.UncheckedIOException;

import org.springframework.stereotype.Service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Service
public class CloudinaryService {

	private static final Cloudinary cloudinary = new Cloudinary();
	
	public String upload(byte[] bytes) {
		try {
			return (String) cloudinary
				.uploader()
				.upload(bytes, ObjectUtils.emptyMap())
				.get("url");
		} catch (IOException e) {
			throw new UncheckedIOException(e);
		}
	}
	
}
