/**
 * @swagger
 * tags:
 *   name: User Management
 *   description: Endpoints for user registration and login
 */

/**
 * @swagger
 * /register:
 *   post:
 *     tags: [User Management]
 *     summary: Register a new user
 *     description: Register a new user with the provided name, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       500:
 *         description: Error occurred while registering the user
 */

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [User Management]
 *     summary: User login
 *     description: Authenticate a user by providing email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Authentication failed
 *       500:
 *         description: Error occurred while logging in
 */

/**
 * @swagger
 * tags:
 *   name: Upload/Download
 *   description: Endpoints that handle upload and download actions
 */

/**
 * @swagger
 * /upload-media:
 *   post:
 *     tags: [Upload/Download]
 *     summary: Upload media
 *     description: Upload multiple media
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               media:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Media uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       url:
 *                         type: string
 *                       id:
 *                         type: string
 *       405:
 *         description: Media upload failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /download/{id}:
 *   get:
 *     tags: [Upload/Download]
 *     summary: Download media
 *     description: Download media by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the image
 *         schema:
 *           type: string
 *     responses:
 *       302:
 *         description: Found. Redirect to the media URL.
 *         headers:
 *           Location:
 *             description: URL to download the media
 *             schema:
 *               type: string
 *       404:
 *         description: Media not found.
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     Image:
 *       type: object
 *       properties:
 *         url:
 *           type: string
 *         id:
 *           type: string
 */

/**
 * @swagger
 * /media:
 *   get:
 *     tags: [Upload/Download]
 *     summary: Get all media
 *     description: Retrieve all media and their IDs
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Image'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */


