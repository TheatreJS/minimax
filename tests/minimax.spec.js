import {Minimax} from '../sources/minimax.js';

import chai from 'chai';

const expect = chai.expect;

describe('Minimax', function () {

    describe('#constructor()', function () {

        function heuristic(node) {

            return node.value;
        }

        function childhood(node) {

            return node.children || [];
        }

        const minimax = new Minimax(heuristic, childhood);

        it('should expose #maximize()', function () {

            expect(minimax.maximize).to.be.a('function');
        });

        it('should expose #minimize()', function () {

            expect(minimax.minimize).to.be.a('function');
        });
    });

    describe('#maximize()', function () {

        it('should return the start move node with search depth of 0', function () {

            function heuristic(node) {

                return node.value;
            }

            function childhood(node) {

                return node.children || [];
            }

            const minimax = new Minimax(heuristic, childhood);

            const A = {'name': 'A', 'value': 0};

            const result = minimax.maximize(A, 0);

            expect(result).to.equal(A);
        });

        it('should return the best next move node with search depth of 1', function () {

            function heuristic(node) {

                return node.value;
            }

            function childhood(node) {

                return node.children || [];
            }

            const minimax = new Minimax(heuristic, childhood);

            let A;
            let A1, A2, A3;

            let result;

            A1 = {'name': 'A1', 'value': 1};
            A2 = {'name': 'A2', 'value': 0};
            A3 = {'name': 'A3', 'value': 0};

            A = {'name': 'A', 'children': [A1, A2, A3]};

            //         A(1)
            //   ,------|------,    ^ MAX
            // A1(1)  A2(0)  A3(0)
            result = minimax.maximize(A, 1);

            expect(result).to.equal(A1);

            A1 = {'name': 'A1', 'value': 0};
            A2 = {'name': 'A2', 'value': 1};
            A3 = {'name': 'A3', 'value': 0};

            A = {'name': 'A', 'children': [A1, A2, A3]};

            //         A(1)
            //   ,------|------,    ^ MAX
            // A1(0)  A2(1)  A3(0)
            result = minimax.maximize(A, 1);

            expect(result).to.equal(A2);

            A1 = {'name': 'A1', 'value': 0};
            A2 = {'name': 'A2', 'value': 0};
            A3 = {'name': 'A3', 'value': 1};

            A = {'name': 'A', 'children': [A1, A2, A3]};

            //         A(1)
            //   ,------|------,    ^ MAX
            // A1(0)  A2(0)  A3(1)
            result = minimax.maximize(A, 1);

            expect(result).to.equal(A3);
        });

        it('should return the best next move node with search depth greater than 1', function () {

            function heuristic(node) {

                return node.value;
            }

            function childhood(node) {

                return node.children || [];
            }

            const minimax = new Minimax(heuristic, childhood);

            let A;
            let A1, A2, A3;
            let A11, A21, A22, A23, A31, A32;
            let A221, A222, A321;

            let result;

            A221 = {'name': 'A221', 'value': 0};
            A222 = {'name': 'A222', 'value': 1};
            A321 = {'name': 'A321', 'value': 1};

            A11 = {'name': 'A11', 'value': 0};
            A21 = {'name': 'A21', 'value': 2};
            A22 = {'name': 'A22', 'children': [A221, A222]};
            A23 = {'name': 'A23', 'value': 2};
            A31 = {'name': 'A31', 'value': 2};
            A32 = {'name': 'A32', 'children': [A321]};

            A1 = {'name': 'A1', 'children': [A11]};
            A2 = {'name': 'A2', 'children': [A21, A22, A23]};
            A3 = {'name': 'A3', 'children': [A31, A32]};

            A = {'name': 'A', 'children': [A1, A2, A3]};

            //                   A(1)
            //   ,----------------|-------------------,        ^ MAX
            // A1(0)            A2(1)               A3(1)
            //   |        ,-------|-------,       ,---|---,    ^ MIN
            // A11(0)  A21(2)  A22(1)  A23(2)  A31(2)  A32(1)
            //                ,---'---,                  |     ^ MAX
            //             A221(0)  A222(1)           A321(1)
            result = minimax.maximize(A, 3);

            expect(result).to.equal(A2);
        });

        it('should use the alpha-beta pruning optimization', function () {

            let tracker = 0;

            function heuristic(node) {

                tracker += 1;

                return node.value;
            }

            function childhood(node) {

                return node.children || [];
            }

            const minimax = new Minimax(heuristic, childhood);

            let A;
            let A1, A2, A3;
            let A11, A21, A22, A23, A31, A32;
            let A221, A222, A321;

            let result;

            A221 = {'name': 'A221', 'value': 0};
            A222 = {'name': 'A222', 'value': 1};
            A321 = {'name': 'A321', 'value': 1};

            A11 = {'name': 'A11', 'value': 0};
            A21 = {'name': 'A21', 'value': 2};
            A22 = {'name': 'A22', 'children': [A221, A222]};
            A23 = {'name': 'A23', 'value': 2};
            A31 = {'name': 'A31', 'value': 0};
            A32 = {'name': 'A32', 'children': [A321]};

            A1 = {'name': 'A1', 'children': [A11]};
            A2 = {'name': 'A2', 'children': [A21, A22, A23]};
            A3 = {'name': 'A3', 'children': [A31, A32]};

            A = {'name': 'A', 'children': [A1, A2, A3]};

            //                   A(1)
            //   ,----------------|-------------------,        ^ MAX
            // A1(0)            A2(1)               A3(0)
            //   |        ,-------|-------,       ,---|---,    ^ MIN
            // A11(0)  A21(2)  A22(1)  A23(2)  A31(0)  A32(1)
            //                ,---'---,                  |     ^ MAX
            //             A221(0)  A222(1)           A321(1)
            result = minimax.maximize(A, 3);

            // alpha-beta pruning cuts on A31 (A32 is never reached)
            expect(tracker).to.equal(10);

            expect(result).to.equal(A2);
        });
    });

    describe('#minimize()', function () {

        it('should return the start move node with search depth of 0', function () {

            function heuristic(node) {

                return node.value;
            }

            function childhood(node) {

                return node.children || [];
            }

            const minimax = new Minimax(heuristic, childhood);

            const A = {'name': 'A', 'value': 0};

            const result = minimax.minimize(A, 0);

            expect(result).to.equal(A);
        });

        it('should return the worst next move node with search depth of 1', function () {

            function heuristic(node) {

                return node.value;
            }

            function childhood(node) {

                return node.children || [];
            }

            const minimax = new Minimax(heuristic, childhood);

            let A;
            let A1, A2, A3;

            let result;

            A1 = {'name': 'A1', 'value': 0};
            A2 = {'name': 'A2', 'value': 1};
            A3 = {'name': 'A3', 'value': 1};

            A = {'name': 'A', 'children': [A1, A2, A3]};

            //         A(0)
            //   ,------|------,    ^ MIN
            // A1(0)  A2(1)  A3(1)
            result = minimax.minimize(A, 1);

            expect(result).to.equal(A1);

            A1 = {'name': 'A1', 'value': 1};
            A2 = {'name': 'A2', 'value': 0};
            A3 = {'name': 'A3', 'value': 1};

            A = {'name': 'A', 'children': [A1, A2, A3]};

            //         A(0)
            //   ,------|------,    ^ MIN
            // A1(1)  A2(0)  A3(1)
            result = minimax.minimize(A, 1);

            expect(result).to.equal(A2);

            A1 = {'name': 'A1', 'value': 1};
            A2 = {'name': 'A2', 'value': 1};
            A3 = {'name': 'A3', 'value': 0};

            A = {'name': 'A', 'children': [A1, A2, A3]};

            //         A(0)
            //   ,------|------,    ^ MIN
            // A1(1)  A2(1)  A3(0)
            result = minimax.minimize(A, 1);

            expect(result).to.equal(A3);
        });

        it('should return the worst next move node with search depth greater than 1', function () {

            function heuristic(node) {

                return node.value;
            }

            function childhood(node) {

                return node.children || [];
            }

            const minimax = new Minimax(heuristic, childhood);

            let A;
            let A1, A2, A3;
            let A11, A21, A22, A23, A31, A32;
            let A221, A222, A321;

            let result;

            A221 = {'name': 'A221', 'value': 4};
            A222 = {'name': 'A222', 'value': 2};
            A321 = {'name': 'A321', 'value': 4};

            A11 = {'name': 'A11', 'value': 4};
            A21 = {'name': 'A21', 'value': 1};
            A22 = {'name': 'A22', 'children': [A221, A222]};
            A23 = {'name': 'A23', 'value': 1};
            A31 = {'name': 'A31', 'value': 1};
            A32 = {'name': 'A32', 'children': [A321]};

            A1 = {'name': 'A1', 'children': [A11]};
            A2 = {'name': 'A2', 'children': [A21, A22, A23]};
            A3 = {'name': 'A3', 'children': [A31, A32]};

            A = {'name': 'A', 'children': [A1, A2, A3]};

            //                   A(2)
            //   ,----------------|-------------------,        ^ MIN
            // A1(4)            A2(2)               A3(4)
            //   |        ,-------|-------,       ,---|---,    ^ MAX
            // A11(4)  A21(1)  A22(2)  A23(1)  A31(1)  A32(4)
            //                ,---'---,                  |     ^ MIN
            //             A221(4)  A222(2)           A321(4)
            result = minimax.minimize(A, 3);

            expect(result).to.equal(A2);
        });

        it('should use the alpha-beta pruning optimization', function () {

            let tracker = 0;

            function heuristic(node) {

                tracker += 1;

                return node.value;
            }

            function childhood(node) {

                return node.children || [];
            }

            const minimax = new Minimax(heuristic, childhood);

            let A;
            let A1, A2, A3;
            let A11, A21, A22, A23, A31, A32;
            let A221, A222, A321;

            let result;

            A221 = {'name': 'A221', 'value': 2};
            A222 = {'name': 'A222', 'value': 1};
            A321 = {'name': 'A321', 'value': 1};

            A11 = {'name': 'A11', 'value': 2};
            A21 = {'name': 'A21', 'value': 0};
            A22 = {'name': 'A22', 'children': [A221, A222]};
            A23 = {'name': 'A23', 'value': 0};
            A31 = {'name': 'A31', 'value': 2};
            A32 = {'name': 'A32', 'children': [A321]};

            A1 = {'name': 'A1', 'children': [A11]};
            A2 = {'name': 'A2', 'children': [A21, A22, A23]};
            A3 = {'name': 'A3', 'children': [A31, A32]};

            A = {'name': 'A', 'children': [A1, A2, A3]};

            //                   A(1)
            //   ,----------------|-------------------,        ^ MIN
            // A1(2)            A2(1)               A3(2)
            //   |        ,-------|-------,       ,---|---,    ^ MAX
            // A11(2)  A21(0)  A22(1)  A23(0)  A31(2)  A32(1)
            //                ,---'---,                  |     ^ MIN
            //             A221(2)  A222(1)           A321(1)
            result = minimax.minimize(A, 3);

            // alpha-beta pruning cuts on A31 (A32 is never reached)
            expect(tracker).to.equal(10);

            expect(result).to.equal(A2);
        });
    });
});
