# TFT Comp Builder

This project is a **Teamfight Tactics (TFT) Comp Builder** application that allows users to:
- Drag champions from a pool to a custom composition.
- Display activated traits based on the current champions in the composition.

## Features

### 1. **Champion Pool**
- Displays all available champions that users can drag to their composition.
- Each champion card shows the following details:
  - Name
  - Cost
  - Traits

### 2. **Your Comp**
- A designated area where users can drop champions to create a custom comp.
- Users can rearrange champions within the composition.

### 3. **Activated Traits**
- A side section dynamically calculates and displays:
  - Traits of the champions in the current composition.
  - The count of champions contributing to each trait.

## Technologies Used

- **React**: Component-based user interface.
- **TypeScript**: Strongly typed language for building robust applications.
- **Next.js**: Framework for server-rendered React applications.
- **react-beautiful-dnd**: For implementing drag-and-drop functionality.
- **Tailwind CSS**: Utility-first CSS framework for styling.

## How to Run the Project

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## File Structure

```
.
├── app
│   ├── page.tsx           # Homepage for the comp builder
│   ├── saved/             # Saved comps page (if implemented later)
│   ├── [compId]/          # Dynamic route for comp details (if implemented later)
├── components
│   ├── ChampionCard.tsx   # Displays individual champion info
│   ├── CompBuilder.tsx    # Core component for building a comp
│   ├── NavBar.tsx         # Navigation bar
├── styles
│   ├── globals.css        # Global styles
├── public
│   ├── tftData.json       # JSON data for all champions
```

## Data Format

The application expects champion data to be in the following JSON format:

```json
{
  "set": 13,
  "champions": [
    {
      "id": "zoe",
      "name": "Zoe",
      "cost": 4,
      "traits": ["Rebel", "Sorcerer"],
      "ability": {
        "name": "Paddle Star",
        "description": "Fires a star that travels in a line, dealing magic damage to the first enemy hit."
      }
    },
    {
      "id": "zyra",
      "name": "Zyra",
      "cost": 1,
      "traits": ["Experiment", "Sorcerer"],
      "ability": {
        "name": "Grasping Roots",
        "description": "Sends vines towards the current target, stunning them and dealing magic damage."
      }
    }
  ]
}
```

## Future Enhancements

- **Save Functionality**: Allow users to save their comps to local storage.
- **Saved Comps Page**: Display saved comps for later reference.
- **Detailed View**: Enable a detailed view of saved comps.

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).

