package vlab.server_java.check;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.json.JSONArray;
import org.json.JSONObject;
import rlcp.check.ConditionForChecking;
import rlcp.generate.GeneratingResult;
import rlcp.server.processor.check.PreCheckProcessor.PreCheckResult;
import rlcp.server.processor.check.PreCheckResultAwareCheckProcessor;

import java.math.BigDecimal;
import java.util.Arrays;

/**
 * Simple CheckProcessor implementation. Supposed to be changed as needed to provide
 * necessary Check method support.
 */
public class CheckProcessorImpl implements PreCheckResultAwareCheckProcessor<String> {
    private static int[] JSonArray2IntArray(JSONArray jsonArray){
        int[] intArray = new int[jsonArray.length()];
        for (int i = 0; i < intArray.length; ++i) {
            intArray[i] = jsonArray.optInt(i);
        }
        return intArray;
    }

    public static boolean checkSelectedNodesData(int answer, int[][] selectedNodesData, int[][] edges, int[][] edgesBack)
    {
        int maxFlow = 0;

        for(int i = 0; i < selectedNodesData.length; i++)
        {
            int currentMinWeight = Integer.MAX_VALUE;
            for(int j = 0; j < selectedNodesData[i].length - 1; j++)
            {
                if(edges[selectedNodesData[i][j]][selectedNodesData[i][j + 1]] < currentMinWeight)
                {
                    currentMinWeight = edges[selectedNodesData[i][j]][selectedNodesData[i][j + 1]];
                }
            }

            maxFlow += currentMinWeight;

            for(int j = 0; j < selectedNodesData[i].length - 1; j++)
            {
                if(selectedNodesData[i][j] < selectedNodesData[i][j+1])
                {
                    edges[selectedNodesData[i][j]][selectedNodesData[i][j+1]] -= +currentMinWeight;
                    edgesBack[selectedNodesData[i][j]][selectedNodesData[i][j+1]] += +currentMinWeight;
                }
                else
                {
                    edges[selectedNodesData[i][j+1]][selectedNodesData[i][j]] += +currentMinWeight;
                    edgesBack[selectedNodesData[i][j+1]][selectedNodesData[i][j]] -= +currentMinWeight;
                }
            }
        }

        System.out.println("KEK");
        System.out.println(Arrays.deepToString(edges));
        System.out.println(Arrays.deepToString(edgesBack));

        return maxFlow == answer;
    }

    public static boolean checkMaxFlow(int answer, int[][] edges, int nodes[])
    {
        MaxFlow m = new MaxFlow();
        int maxFlow = m.fordFulkerson(edges, nodes[0], nodes[nodes.length - 1]);

        return answer == maxFlow;
    }

    @Override
    public CheckingSingleConditionResult checkSingleCondition(ConditionForChecking condition, String instructions, GeneratingResult generatingResult) throws Exception {
        //do check logic here
        String code = generatingResult.getCode();

        JSONObject jsonCode = new JSONObject(code);
        JSONObject jsonInstructions = new JSONObject(instructions);

        int[] nodes = JSonArray2IntArray(jsonCode.getJSONArray("nodes"));
        JSONArray objEdges = jsonCode.getJSONArray("edges");
        JSONArray objEdgesBack = jsonCode.getJSONArray("edgesBack");
        JSONArray objSelectedNodesVariantData = jsonInstructions.getJSONArray("selectedNodesVariantData");

        int[][] edges = new int[nodes.length][nodes.length];
        int[][] edgesBack = new int[nodes.length][nodes.length];
        int[][] selectedNodesVariantData = new int[objSelectedNodesVariantData.length() - 1][];

        for(int i = 0; i < selectedNodesVariantData.length; i++)
        {
            selectedNodesVariantData[i] = JSonArray2IntArray(objSelectedNodesVariantData.getJSONArray(i));
        }

        for(int i = 0; i < edges.length; i++)
        {
            edges[i] = JSonArray2IntArray(objEdges.getJSONArray(i));
            edgesBack[i] = JSonArray2IntArray(objEdgesBack.getJSONArray(i));
        }


        BigDecimal points;
        String comment;

//        checkSelectedNodesData(jsonInstructions.getInt("maxFlow"), selectedNodesVariantData, edges, edgesBack);
//        if(checkMaxFlow(jsonInstructions.getInt("maxFlow"), edges, nodes))
        if(checkSelectedNodesData(jsonInstructions.getInt("maxFlow"), selectedNodesVariantData, edges, edgesBack))
        {
            points = new BigDecimal(1.0);
            comment = "it's ok";
        }
        else
        {
            points = new BigDecimal(0);
            comment = "it's not ok" + Arrays.deepToString(selectedNodesVariantData);
        }

        return new CheckingSingleConditionResult(points, comment);
    }

    @Override
    public void setPreCheckResult(PreCheckResult<String> preCheckResult) {}
}
