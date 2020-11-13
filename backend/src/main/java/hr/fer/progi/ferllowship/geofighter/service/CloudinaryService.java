package hr.fer.progi.ferllowship.geofighter.service;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

@Service
public class CloudinaryService {

	private static Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
		"cloud_name", "ferllowship",
		"api_key", "558424752216417",
		"api_secret", "Mcj9aGAcqmKi6Zx4OXNcV9Cy5KI"
	));
	
	public String createLink(MultipartFile picture) {
		try {
			@SuppressWarnings("rawtypes")
			Map result = cloudinary.uploader().upload(picture.getBytes(), ObjectUtils.emptyMap());
			String pictureLink = (String) result.get("url");
			return pictureLink;
		} catch (IOException e) {
			throw new UncheckedIOException(e);
		}
	}
	
}
