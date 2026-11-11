# PlacementCell IIITDM

Monorepo for the IIITDM Placement Cell platform.

## Projects

| Project | Status | Description |
|---------|--------|-------------|
| [PlacementicsFrontend/placementics](PlacementicsFrontend/placementics/) | **Active** | Next.js 16 student portal (login, feedback form, feedback display) |
| [PlacementCellBackend](PlacementCellBackend/) | Active | Spring API |

## Quick Start

### Backend
```bash
cd PlacementCellBackend
mvn spring-boot:rum
```
Runs on `https://localhost:7070`

### Frontend (Next.js)
```bash
cd PlacementicsFrontend/placementics
npm install
cp .env.example .env.local
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)
