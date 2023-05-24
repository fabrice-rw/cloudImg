/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload a file
 *     tags:
 *       - files
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '200':
 *         description: File uploaded successfully
 *
 * /download/{fileId}:
 *   get:
 *     summary: Download a file
 *     tags:
 *       - files
 *     parameters:
 *       - name: fileId
 *         in: path
 *         description: ID of the file to download
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: File downloaded successfully
 */


/**
 * @swagger
 * /signup:
 *   post:
 *     tags:
 *       - users
 *     summary: Create a new user account
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successfully created a new user account
 *
 * /login:
 *   post:
 *     summary: User login
 *     tags:
 *       - users
 *     requestBody:
 *       description: Please fill all required fields
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: User log in successfully
 *       '400':
 *         description: Bad request
 */
