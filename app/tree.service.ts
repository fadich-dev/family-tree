export class TreeService {
    getTree(): any[] {
        return [
            {
                _id: "132gy231y23y23j",
                name: "Grand",
                photo: "/some",
                parent: null,
                children: [
                    {
                        _id: "78ds87dfshewr78",
                        name: "Some Name",
                        photo: null,
                        parent: "132gy231y23y23j",
                        children: [
                            {
                                _id: "67e76re7uher9",
                                name: "chchch Some Name",
                                photo: null,
                                parent: "78ds87dfshewr78",
                                children: []
                            },
                            {
                                _id: "889u89NIUBI78njui",
                                name: "chchch Some node 2",
                                photo: "/some",
                                parent: "78ds87dfshewr78",
                                children: []
                            }
                        ]
                    },
                    {
                        _id: "i8ekjd8fdke",
                        name: "Some node 2",
                        photo: "/some",
                        parent: "132gy231y23y23j",
                        children: []
                    }
                ]
            }
        ];
    }
}
