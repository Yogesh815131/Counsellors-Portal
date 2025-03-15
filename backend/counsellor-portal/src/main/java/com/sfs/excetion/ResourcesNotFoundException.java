package com.sfs.excetion;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ResourcesNotFoundException extends RuntimeException{
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ResourcesNotFoundException.class);
	
	public ResourcesNotFoundException(String msg) {
		super(msg);
		LOGGER.error(msg);
	}

}
