# DeepFind.Me  

DeepFind.Me is an educational open-source OSINT (Open Source Intelligence) platform designed to help individuals and investigators analyze digital footprints, uncover online information, and protect their privacy.  

## **Project Structure**  

The project is organized into the following directories:  

- **`api/`** → Backend (NestJS, Node.js)  
- **`web/`** → Frontend (Next.js)  

## **Branching Strategy**  

- **`release`** → Stable production-ready code  
- **`develop`** → Active development, latest features being tested  

For contributions, create a branch from `develop` and submit pull requests accordingly.  

## **Backend (API)**  

The backend is built using Node.js and NestJS with a structured **service → model → controller** pattern.  

### **Running the Backend**  

1. Navigate to the backend directory:  
   ```bash
   cd api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm run start
   ```

The backend server will start on the default NestJS port (usually 5000).

## Frontend (Web)

The frontend is built with Next.js for a smooth user experience.

### Running the Frontend

1. Navigate to the ```web``` folder:
   ```bash
   cd web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend development server will start on the default port (usually 3000).

## Usage

Once both the backend and frontend servers are running, you can access the web application in your browser by visiting ```localhost:3000``` to explore DeepFind.Me’s OSINT tools.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push the branch to your fork.
4. Submit a pull request to ```develop```.

## Related Documents

- TOOLSTATUS.md → Tracks tool development status.
- LICENSE → Licensing information.

## License
DeepFind.Me is licensed under the Apache 2.0 License.  See the ```LICENSE``` file for details.

## **Contact**  

For questions, collaborations, or tool requests:  

- **Twitter:** [Buddhsen Tripathi](https://x.com/intent/follow?screen_name=_TripathiJi)  
- **Website:** [DeepFind.Me](https://deepfind.me)  
