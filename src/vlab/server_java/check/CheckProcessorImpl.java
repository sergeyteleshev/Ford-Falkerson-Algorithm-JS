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

    @Override
    public CheckingSingleConditionResult checkSingleCondition(ConditionForChecking condition, String instructions, GeneratingResult generatingResult) throws Exception {
        //do check logic here
        MaxFlow m = new MaxFlow();
        String code = generatingResult.getCode();

        JSONObject jsonCode = new JSONObject(code);
        JSONObject jsonInstructions = new JSONObject(instructions);
        int[] nodes = JSonArray2IntArray(jsonCode.getJSONArray("nodes"));
        JSONArray objEdges = jsonCode.getJSONArray("edges");
        JSONArray objEdgesBack = jsonCode.getJSONArray("edgesBack");
        int[][] edges = new int[nodes.length][nodes.length];
        int[][] edgesBack = new int[nodes.length][nodes.length];

        for(int i = 0; i < edges.length; i++)
        {
            edges[i] = JSonArray2IntArray(objEdges.getJSONArray(i));
            edgesBack[i] = JSonArray2IntArray(objEdgesBack.getJSONArray(i));
        }

        int maxFlow = m.fordFulkerson(edges, nodes[0], nodes[nodes.length - 1]);
        BigDecimal points;
        String comment;

        if(maxFlow == jsonInstructions.getInt("maxFlow"))
        {
            points = new BigDecimal(1.0);
            comment = "it's ok";
        }
        else
        {
            points = new BigDecimal(0);
            comment = "it's not ok";
        }

        return new CheckingSingleConditionResult(points, comment);
    }

    @Override
    public void setPreCheckResult(PreCheckResult<String> preCheckResult) {}
}
