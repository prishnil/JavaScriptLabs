//an array consisting of 14 roads, that connect 11 different places in Meadowville
const roads = [
    "Alice's House-Bob's House",   "Alice's House-Cabin",
    "Alice's House-Post Office",   "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop",          "Marketplace-Farm",
    "Marketplace-Post Office",     "Marketplace-Shop",
    "Marketplace-Town Hall",       "Shop-Town Hall"
];

//a function called buildGraph that takes in edges as a parameter
//the function will convert the list of roads to data structures
//the functions creates a map object that stores an array of connected nodes
//uses split method to go from road strings, to a two element array that contains start and end as separate strings
function buildGraph(edges) {
    let graph = Object.create(null);
    function addEdge(from, to) {
        if (graph[from] == null) {
            graph[from] = [to];
        } else {
            graph[from].push(to);
        }
    }
    for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    return graph;
}

const roadGraph = buildGraph(roads);

//this class creates a new state when the robot move instead of changing the state
class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

    //this method first checks if there is a road between the current place and the destinations
    //and if not it will return to the old state and it would not be a valid move
    //creates a new state of parcels that the robot is carrying
    //map moves and filter delivers
    move(destination) {
        if (!roadGraph[this.place].includes(destination)) {
            return this;
        } else {
            let parcels = this.parcels.map(p => {
                if (p.place != this.place) return p;
                return {place: destination, address: p.address};
            }).filter(p => p.place != p.address);
            return new VillageState(destination, parcels);
        }
    }
}

//set first to be at post office and have to deliver parcel to Alice's house
let first = new VillageState(
    "Post Office",
    [{place: "Post Office", address: "Alice's House"}]
);
let next = first.move("Alice's House");

//printing to the console
console.log(next.place);
// → Alice's House
console.log(next.parcels);
// → []
console.log(first.place);
// → Post Office

//this function that makes sure that the objects are not changed
let object = Object.freeze({value: 5});
object.value = 10;
console.log(object.value);
// → 5

//allows the robot to make plans and execute them
//the robot returns an object containing the direction it wants to move in
//and a memory value that will be given the next time its called
function runRobot(state, robot, memory) {
    for (let turn = 0;; turn++) {
        if (state.parcels.length == 0) {
            console.log(`Done in ${turn} turns`);
            break;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        console.log(`Moved to ${action.direction}`);
    }
}

//this will give a random element of the array
//a random number is multiplied the length of an array and the floor is taken
function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}
function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
}

//this functions creates an initial random village with parcels
//the parcels are made with different start and end points
VillageState.random = function(parcelCount = 5) {
    let parcels = [];
    for (let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;
        do {
            place = randomPick(Object.keys(roadGraph));
        } while (place == address);
        parcels.push({place, address});
    }
    return new VillageState("Post Office", parcels);
};

//runs and robot - shows the places that it goes to and how many turns it takes
runRobot(VillageState.random(), randomRobot);
// → Moved to Marketplace
// → Moved to Town Hall
// → …
// → Done in 63 turns


//an array that models the mail route which goes to all the places in the village
//if it is run twice all the packages will be deliveres
const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];

//to use the mail route the robot will have to remember where it has been and where to go next
//the robot will drop the first element of each turn
function routeRobot(state, memory) {
    if (memory.length == 0) {
        memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
}

//move towards a given parcel or to a given location where it needs to be delivered
//grow the routs form the starting points by exploring each place that has not been visited
//do that until the reaching goa;
//will only explore the routes of interest and find the one of the shortest ones
function findRoute(graph, from, to) {
    let work = [{at: from, route: []}];
    for (let i = 0; i < work.length; i++) {
        let {at, route} = work[i];
        for (let place of graph[at]) {
            if (place == to) return route.concat(place);
            if (!work.some(w => w.at == place)) {
                work.push({at: place, route: route.concat(place)});
            }
        }
    }
}

//uses its memory as a list of directions to move in
//when the list is empty, it takes first undelivered parcel, and if not picked yet, plans route to that /
//if parcel is picked up, the robot wil create a route towards delivery address
function goalOrientedRobot({place, parcels}, route) {
    if (route.length == 0) {
        let parcel = parcels[0];
        if (parcel.place != place) {
            route = findRoute(roadGraph, place, parcel.place);
        } else {
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    return {direction: route[0], memory: route.slice(1)};
}

//this functions counts how many steps it takes for the robot to deliver all the packages
function countSteps(state, robot, memory) {
    for (let steps = 0;; steps++) {
        if (state.parcels.length == 0) return steps;
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
    }
}

//takes two robots and gives it a 100 takes to solve
//it will output the average number of steps each robot took per task
function compareRobots(robot1, memory1, robot2, memory2) {
    let total1 = 0, total2 = 0;
    for (let i = 0; i < 100; i++) {
        let state = VillageState.random();
        total1 += countSteps(state, robot1, memory1);
        total2 += countSteps(state, robot2, memory2);
    }
    console.log(`Robot 1 needed ${total1 / 100} steps per task`)
    console.log(`Robot 2 needed ${total2 / 100}`)
}

compareRobots(routeRobot, [], goalOrientedRobot, []);

//instead of focusing on one parcel at a time, compare all routes and take the shortest one
//if multiple short routes, prefer ones that pick up package over delivering package
function lazyRobot({place, parcels}, route) {
    if (route.length == 0) {
        // Describe a route for every parcel
        let routes = parcels.map(parcel => {
            if (parcel.place != place) {
                return {route: findRoute(roadGraph, place, parcel.place),
                    pickUp: true};
            } else {
                return {route: findRoute(roadGraph, place, parcel.address),
                    pickUp: false};
            }
        });

        // This determines the precedence a route gets when choosing.
        // Route length counts negatively, routes that pick up a package
        // get a small bonus.
        function score({route, pickUp}) {
            return (pickUp ? 0.5 : 0) - route.length;
        }
        route = routes.reduce((a, b) => score(a) > score(b) ? a : b).route;
    }

    return {direction: route[0], memory: route.slice(1)};
}

//this class stores a set of values
//when the value is added to the group, a new group with a cope of the original array that has the value added
//when a value is deleted, it is filtered from the array
class PGroup {
    constructor(members) {
        this.members = members;
    }

    add(value) {
        if (this.has(value)) return this;
        return new PGroup(this.members.concat([value]));
    }

    delete(value) {
        if (!this.has(value)) return this;
        return new PGroup(this.members.filter(m => m !== value));
    }

    has(value) {
        return this.members.includes(value);
    }
}

//only one empty instance since all empty groups are the same
PGroup.empty = new PGroup([]);

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false