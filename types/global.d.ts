declare namespace NodeJS {
  interface ProcessEnv {
    PORT: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_REGION: string;
    AWS_ENDPOINT_URL: string;
    AWS_CREATE_BUCKET_IF_NOT_EXISTS: string;
    AWS_KMS_GENERATOR_KEY_ID: string;

    CORS_ALLOWED_ORIGINS: string;

    UPLOADS_USER_IMAGES_BUCKET: string;
    UPLOADS_USER_FILES_BUCKET: string;
    UPLOADS_USER_IMAGES_PATH: string;
    UPLOADS_USER_FILES_PATH: string;
    UPLOADS_MAX_FILES: string;
    UPLOADS_MAX_FILE_SIZE: string;

    JWT_ADMIN_SECRET_KEY: string;
    JWT_STUDENT_SECRET_KEY: string;
    JWT_EXPIRES_IN: string;

    DB_PASSWORD: string;
    DB_NAME: string;
    DB_TYPE: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_USER: string;
  }
}
