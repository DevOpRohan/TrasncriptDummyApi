
# **Transcript API**

A Node.js dummy application providing real-time transcript streaming via **HTTP** and **WebSocket**. This project simulates a transcript generator where clients can fetch sentences via HTTP requests or subscribe to a live stream via WebSocket.


## **Requirements**

- **Node.js**: Version 14.x or higher.
- **npm**: Comes pre-installed with Node.js.

---

## **Getting Started**

### **1. Clone the Repository**

To get started, clone this repository to your local machine:

```bash
git clone https://github.com/yourusername/transcript-api.git
cd transcript-api
```

---

### **2. Install Dependencies**

Install the required dependencies using npm:

```bash
npm install
```

---

### **3. Run the Application**

Start the server:

```bash
npm start
```

By default, the application runs on port `8000`. You’ll see output similar to:

```plaintext
Server is running on http://localhost:8000
WebSocket endpoint available at ws://localhost:8000
```

---

## **API Endpoints**

### **HTTP API**

- **Endpoint**: `/normal-transcript`
- **Method**: `GET`
- **Description**: Returns a new transcript sentence in JSON format.

#### Example Request:

```bash
curl http://localhost:8000/normal-transcript
```

#### Example Response:

```json
{
  "transcript": "This is a simulated transcript."
}
```

Each request generates a unique transcript sentence, avoiding consecutive duplicates.

---

### **WebSocket API**

- **Endpoint**: `/ws/realtime-transcript`
- **Protocol**: WebSocket (`ws://`)
- **Description**: Streams transcript sentences in real-time. A new sentence is sent every second.

#### Connecting to the WebSocket Server

You can use a WebSocket client like `wscat`, Postman, or any browser-based WebSocket tool to connect to the WebSocket API.

#### Using `wscat`:

1. Install `wscat` globally:

   ```bash
   npm install -g wscat
   ```

2. Connect to the WebSocket server:

   ```bash
   wscat -c ws://localhost:8000/ws/realtime-transcript
   ```

3. Example Output:

   ```plaintext
   Connected (press CTRL+C to quit)
   < Hello, how are you doing today?
   < This is a simulated transcript.
   < Node.js is great for real-time applications.
   ```

Each `<` line represents a new message received from the server every second.

---

## **Testing**

### **1. Test the HTTP API**

You can test the HTTP API using `curl`:

```bash
curl http://localhost:8000/normal-transcript
```

Alternatively, you can use Postman or any HTTP client.

---

### **2. Test the WebSocket API**

To test the WebSocket API:

- Use `wscat` as described above.
- Or, connect via Postman/WebSocket Client:

  1. Open Postman.
  2. Select **New Request > WebSocket**.
  3. Enter the URL: `ws://localhost:8000/ws/realtime-transcript`.
  4. Connect and observe the incoming messages.