package hr.fer.progi.ferllowship.geofighter.service;

import java.io.IOException;
import java.io.UncheckedIOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Service
public class CloudinaryService {

	private static Cloudinary cloudinary = new Cloudinary();
	
	public String upload(MultipartFile picture) {
		try {
			return (String) cloudinary
				.uploader()
				.upload(picture.getBytes(), ObjectUtils.emptyMap())
				.get("url");
		} catch (IOException e) {
			throw new UncheckedIOException(e);
		}
	}
	
}
