package vlab.server_java.generate;

import org.json.JSONObject;
import rlcp.generate.GeneratingResult;
import rlcp.server.processor.generate.GenerateProcessor;

import java.util.Random;

/**
 * Simple GenerateProcessor implementation. Supposed to be changed as needed to
 * provide necessary Generate method support.
 */
public class GenerateProcessorImpl implements GenerateProcessor {
    @Override
    public GeneratingResult generate(String condition) {
        //do Generate logic here
        String text = "text";
        String code = "code";
        String instructions = "instructions";
        int maxNodes = 7;
        int maxEdgeValue = 15;
        int[][] edges = new int[maxNodes][maxNodes];
        int[][] edgesBack = new int[maxNodes][maxNodes];
        int[] nodes = new int[maxNodes];
        final Random random = new Random();
        JSONObject graph = new JSONObject();

        for (int i = 0; i < nodes.length; i++)
        {
            nodes[i] = i;
        }

        for (int i = 0; i < edges.length; i++)
        {
            for (int j = 0; j < edges[i].length; j++)
            {
                if(j > i)
                {
                    if(random.nextBoolean())
                    {
                        edges[i][j] = random.nextInt(maxEdgeValue);
                    }
                    else
                    {
                        edges[i][j] = 0;
                    }
                }
                else
                {
                    edges[i][j] = 0;
                }

                edgesBack[i][j] = 0;
            }
        }

        graph.put("nodes", nodes);
        graph.put("edges", edges);
        graph.put("edgesBack", edgesBack);

        code = graph.toString();
        text = "найдите максимальный поток из вершины " + Integer.toString(nodes[0]) + " в вершину  " + Integer.toString(nodes.length - 1);

        return new GeneratingResult(text, code, instructions);
    }
}
