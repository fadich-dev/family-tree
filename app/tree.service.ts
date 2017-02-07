export class TreeService {
    getTree(): any[] {
        return [
            {
                _id: "67g324y23478324b3",
                name: "Grand",
                photo: null,//"/some",
                parent: null,
                children: [
                    {
                        _id: "67g324y23478324b3",
                        name: "Some Name",
                        photo: null,
                        parent: "67g324y23478324b3",
                        children: [
                            {
                                _id: "67g324y23478324b3",
                                name: "chchch Some Name",
                                photo: null,
                                parent: "67g324y23478324b3",
                                children: []
                            },
                            {
                                _id: "889u89NIUBI78njui",
                                name: "chchch Some node 2",
                                photo: null,//"/some",
                                parent: "67g324y23478324b3",
                                children: []
                            }
                        ]
                    },
                    {
                        _id: "889u89NIUBI78njui",
                        name: "Some node 2",
                        photo: null,//"/some",
                        parent: "67g324y23478324b3",
                        children: []
                    }
                ]
            }
        ];
    }
}
