const shortestDistanceNode = (distances, visited) => {
    let shortest = null;

    for (const node in distances) {
        const currentIsShortest = shortest === null || distances?.[node] < distances?.[shortest];
        if (currentIsShortest && visited.includes(node) === false) shortest = node;
    }
    return shortest;
};

const findShortestPath = (graph, startNode, endNode) => {
    // establish object for recording distances from the start node
    let distances = {};
    distances[endNode] = Infinity;
    distances = { ...distances, ...graph?.[startNode] };

    // track paths
    let parents = { endNode: null };
    for (const child in graph?.[startNode]) {
        parents[child] = startNode;
    }

    // track nodes that have already been visited
    let visited = [];

    // find the nearest node
    let node = shortestDistanceNode(distances, visited);

    // for that node
    while (node) {
        // find its distance from the start node & its child nodes
        const distance = distances?.[node];
        const children = graph?.[node];
        // for each of those child nodes
        for (const child in children) {
            // make sure each child node is not the start node
            if (String(child) === String(startNode)) continue;

            // save the distance from the start node to the child node
            const newDistance = distance + children?.[child];
            // if there's no recorded distance from the start node to the child node in the distances object
            // or if the recorded distance is shorter than the previously stored distance from the start node to the child node
            // save the distance to the object
            // record the path
            if (distances?.[child] === undefined || distances?.[child] > newDistance) {
                distances[child] = newDistance;
                parents[child] = node;
            }
        }
        // move the node to the visited set
        visited = [...visited, node];
        // move to the nearest neighbor node
        node = shortestDistanceNode(distances, visited);
    }

    // using the stored paths from start node to end node
    // record the shortest path
    let shortestPath = [endNode];
    let parent = parents?.[endNode];
    while (parent) {
        shortestPath = [...shortestPath, parent];
        parent = parents?.[parent];
    }
    const shortestPathCopy = [...shortestPath];
    shortestPathCopy.reverse();
    shortestPath = shortestPathCopy

    // return the shortest path from start node to end node & its distance
    const results = {
        distance: distances?.[endNode],
        path: shortestPath,
    };

    return results;
};

const graph = {
    A: { B: 4, C: 2, },
    B: { C: 3, D: 2, E: 3, },
    C: { B: 1, D: 4, E: 5, },
    D: {},
    E: { D: 1, },
};

const findShortestPathResult = findShortestPath(graph, 'A', 'E');
console.log('findShortestPathResult', findShortestPathResult);
